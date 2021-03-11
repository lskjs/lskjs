// import SHA256 from 'crypto-js/sha256';
import Module from '@lskjs/module';
import SHA256 from 'crypto-js/sha256';
import CsvReadableStream from 'csv-reader';
import fs from 'fs';
import get from 'lodash/get';
import path from 'path';

import config from './config';

const { ClickHouse } = require('clickhouse');

export class ClickhouseServerModule extends Module {
  config = config;

  async getConfig() {
    return {
      ...(await super.getConfig()),
      ...get(this, 'config', {}),
      ...get(this, '__config', {}),
    };
  }

  async init() {
    await super.init();
    const ch = new ClickHouse(this.config);
    this.ch = ch;
  }

  // все что ниже делает запросы через clickhouse-client
  createFilename(query) {
    return `${SHA256(query)}_${Date.now()}.csv`;
  }
  removeFile(filename) {
    try {
      fs.unlinkSync(this.getFilepath(filename));
    } catch (err) {
      this.app.log.error(err);
    }
  }
  getFilepath(filename) {
    const filepath = get(this.config, 'external.filepath', '/home');
    return path.join(filepath, filename);
  }
  createNativeQuery(query) {
    const { url } = this.config;
    const host = url.replace('http://', '');
    const filename = this.createFilename(query);
    const filepath = this.getFilepath(filename);
    if (__DEV__) {
      const { command, args } = {
        command: 'docker-compose',
        args: [
          'run',
          'clickhouse-client',
          `--host ${host}`,
          `--database ${this.config.database}`,
          `--password ${this.config.password}`,
          '--format CSVWithNames',
          `--query "${query}"`,
          '>',
          filepath,
        ],
      };
      // const execCommand = `${command} ${args.join(' ')}`;
      // console.log(execCommand);
      return {
        command,
        args,
        filename,
      };
    }
    return {
      filename,
      command: 'clickhouse-client',
      args: [
        `--host ${host}`,
        `--database ${this.config.database}`,
        `--password ${this.config.password}`,
        '--format CSVWithNames',
        `--query "${query}"`,
        '>',
        filepath,
      ],
    };
  }
  async readCsvFile(filename) {
    const inputStream = fs.createReadStream(this.getFilepath(filename), 'utf8');
    let isFirstRow = true;
    let keyNames = [];
    const rows = [];
    return new Promise((resolve) => {
      inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', (row) => {
          if (isFirstRow) {
            keyNames = row;
            isFirstRow = false;
          } else {
            // console.log('A row arrived: ', row);
            const obj = {};
            keyNames.forEach((key, i) => {
              obj[key] = row[i];
            });
            rows.push(obj);
          }
        })
        .on('end', () => resolve(rows));
    });
  }
  async nativeQuery(query) {
    const { debug } = this.config;
    if (debug) {
      console.log({ debug });
    }
    const { command, args, filename } = this.createNativeQuery(query);
    const proc = spawn(command, args, { shell: true });
    await new Promise((resolve, reject) => {
      proc.stdout.on('data', (data) => {
        if (debug) {
          console.log(`clickhouse stdout: ${data}`);
        }
      });

      proc.stderr.on('data', (data) => {
        if (debug) {
          console.log(`stderr: ${data}`);
        }
        return reject();
      });

      proc.on('close', () => resolve());
    });
    const data = await this.readCsvFile(filename);
    this.removeFile(filename);
    return data;
  }
  // все что ниже делает запросы напрямую в clickhouse
  getWhereStrFromJson(json) {
    let whereStr = ' WHERE ';
    Object.keys(json).forEach((key, i, arr) => {
      const value = json[key];
      if (typeof value === 'string') {
        whereStr += `${key} = '${value}'`;
      } else {
        whereStr += `${key} = ${value}`;
      }
      if (i < arr.length - 1) {
        whereStr += ' AND ';
      }
    });
    return whereStr;
  }
  async ping() {
    const res = await this.ch.query('SELECT 1').toPromise();
    return res;
  }
  async find({ tableName, select = '*', limit, where }) {
    const { ch } = this;
    let selectStr = select;
    if (Array.isArray(select)) {
      selectStr = select.join(', ');
    }
    let queryStr = `SELECT ${selectStr} `;
    queryStr += `FROM ${tableName} FINAL`;
    if (where) {
      const whereStr = this.getWhereStrFromJson(where);
      queryStr += whereStr;
    }
    if (limit) {
      queryStr += ` LIMIT ${limit}`;
    }
    return ch.query(queryStr).toPromise();
  }
  async count({ tableName, where }) {
    const { ch } = this;
    let queryStr = 'SELECT count() ';
    queryStr += `FROM ${tableName}`;
    if (where) {
      const whereStr = this.getWhereStrFromJson(where);
      queryStr += whereStr;
    }
    const res = await ch.query(queryStr).toPromise();
    return get(res, '0.count()', null);
  }
  async findOne(params) {
    const rows = await this.find({ ...params, limit: 1 });
    if (rows && rows[0]) return rows[0];
    return null;
  }
  async delete({ tableName, where }) {
    const { ch } = this;
    return ch.query(`ALTER TABLE ${tableName} DELETE ${this.getWhereStrFromJson(where)};`).toPromise();
  }
  async optimize({ tableName }) {
    const { ch } = this;
    return ch.query(`OPTIMIZE TABLE ${tableName} FINAL;`).toPromise();
  }
  async query(query) {
    const { ch } = this;
    return ch.query(query).toPromise();
  }
  async streamQuery(query) {
    const { ch } = this;
    const data = [];
    return new Promise((resolve, reject) => {
      ch.query(query)
        .stream()
        .on('data', (res) => {
          // console.log({ i, debug });
          data.push(res);
        })
        .on('error', (err) => reject(err))
        .on('end', () => resolve(data));
    });
  }
  async insertOne({ tableName, values }) {
    const { ch } = this;
    const ws = ch.insert(`INSERT INTO ${tableName}`).stream();
    await ws.writeRow(values);
    const result = await ws.exec();
    await this.optimize({ tableName });
    return result;
  }
  async insertMany({ tableName, values }) {
    const { ch } = this;
    const ws = ch.insert(`INSERT INTO ${tableName}`).stream();
    await Promise.mapSeries(values, async (v) => {
      await ws.writeRow(v);
    });
    try {
      const res = await ws.exec();
      // await this.optimize({ tableName });
      return res;
    } catch (err) {
      console.error(err.toString(), err);
      throw err;
    }
  }
}

export default ClickhouseServerModule;

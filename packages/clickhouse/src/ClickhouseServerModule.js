// import SHA256 from 'crypto-js/sha256';
import Module from '@lskjs/module';
import { spawn } from 'child_process';
import { ClickHouse } from 'clickhouse';
import SHA256 from 'crypto-js/sha256';
import CsvReadableStream from 'csv-reader';
import fs from 'fs';
import get from 'lodash/get';
import path from 'path';

import config from './config';

export class ClickhouseServerModule extends Module {
  config = config;

  async init() {
    await super.init();
    const client = new ClickHouse(this.config);
    this.client = client;
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
    const filepath = get(this.config, 'external.filepath', '/tmp');
    return path.join(filepath, filename);
  }
  createNativeQuery(query) {
    const { url, native } = this.config;
    const host = url.replace('http://', '');
    const filename = this.createFilename(query);
    const filepath = this.getFilepath(filename);
    if (!native) {
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
    const { command, args, filename } = this.createNativeQuery(query);
    const proc = spawn(command, args, { shell: true });
    await new Promise((resolve, reject) => {
      proc.stdout.on('data', (data) => {
        this.log.trace(`clickhouse stdout: ${data}`);
      });

      proc.stderr.on('data', (data) => {
        this.log.error(`clickhouse stdout: ${data}`);
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
    const res = await this.client.query('SELECT 1').toPromise();
    return res;
  }
  async find({ tableName, select = '*', limit, where }) {
    const { client } = this;
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
    return client.query(queryStr).toPromise();
  }
  async count({ tableName, where }) {
    const { client } = this;
    let queryStr = 'SELECT count() ';
    queryStr += `FROM ${tableName}`;
    if (where) {
      const whereStr = this.getWhereStrFromJson(where);
      queryStr += whereStr;
    }
    const res = await client.query(queryStr).toPromise();
    return get(res, '0.count()', null);
  }
  async findOne(params) {
    const rows = await this.find({ ...params, limit: 1 });
    if (rows && rows[0]) return rows[0];
    return null;
  }
  async delete({ tableName, where }) {
    const { client } = this;
    return client.query(`ALTER TABLE ${tableName} DELETE ${this.getWhereStrFromJson(where)};`).toPromise();
  }
  async optimize({ tableName }) {
    const { client } = this;
    return client.query(`OPTIMIZE TABLE ${tableName} FINAL;`).toPromise();
  }
  async query(query) {
    const { client } = this;
    return client.query(query).toPromise();
  }
  async streamQuery(query) {
    const { client } = this;
    const data = [];
    return new Promise((resolve, reject) => {
      client
        .query(query)
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
    const { client } = this;
    const ws = client.insert(`INSERT INTO ${tableName}`).stream();
    await ws.writeRow(values);
    const result = await ws.exec();
    await this.optimize({ tableName });
    return result;
  }
  async insertMany({ tableName, values }) {
    const { client } = this;
    const ws = client.insert(`INSERT INTO ${tableName}`).stream();
    await Promise.mapSeries(values, async (v) => {
      await ws.writeRow(v);
    });
    try {
      const res = await ws.exec();
      // await this.optimize({ tableName });
      return res;
    } catch (err) {
      this.log.error(err.toString(), err);
      throw err;
    }
  }
}

export default ClickhouseServerModule;

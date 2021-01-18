import snakeCase from 'lodash/snakeCase';
import mapKeys from '@lskjs/utils/mapKeys';
import mapValuesKeys from '@lskjs/utils/mapValuesKeys';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import isFinite from 'lodash/isFinite';
import tryJSONstringify from '@lskjs/utils/tryJSONstringify';
import tryJSONparse from '@lskjs/utils/tryJSONparse';

const notNan = a => (isFinite(a) ? a : null);

class BaseScyllaModel {
  constructor({ app }) {
    this.app = app;
    this.log = app.log;
    if (!this.schema) this.schema = this.getSchema();
  }
  static async run(props) {
    const obj = new this(props);
    await obj.run();
    return obj;
  }
  getSchema() {
    return {};
  }
  stringifyData(data) {
    return mapValues(data, (value, key) => {
      const type = this.schema[key];
      if (!type) {
        this.log.warn('missing field in schema: ', key);
        return undefined;
      }
      if (['int', 'bigint', 'smallint'].includes(type)) return notNan(Number(value));
      if (type === 'text<json>') return tryJSONstringify(value);
      if (type === 'timestamp') return new Date(value).getTime();
      if (type.startsWith('list')) {
        const value2 = (Array.isArray(value) ? value.filter(a => a !== null && a !== undefined) : null);
        // console.log({ value, value2 });
        return value2;
      }
      return value;
    });
  }
  parseData(data) {
    return mapValuesKeys(data, (value, key) => {
      const type = this.schema[key];

      if (typeof value === 'undefined') return null;
      if (type === 'text<json>') return { key, value: tryJSONparse(value) };
      if (type === 'timestamp') return { key, value: new Date(value) };
      return { key, value };
    });
  }
  getSchemaString() {
    const schema = mapKeys(this.schema, (value, key) => {
      const newKey = key[0] === '_' ? `_${snakeCase(key)}` : snakeCase(key);
      if (newKey[0] === '_') return `"${newKey}"`;
      return newKey;
    });
    return map(schema, (value, key) => `${key} ${value === 'text<json>' ? 'text' : value}`).join(',\n');
  }

  createInsertQuery(table, data) {
    const keys = Object.keys(data);
    const { defaultKeyspace } = this.scylla.config;
    return `INSERT INTO ${defaultKeyspace}.${this.table} (${keys.map(key => `"${key}"`).join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;
  }
  async execute(query, values, options, json) {
    if (this.scylla.debug) this.scylla.log.trace(`[scylla] table=${this.table}\n`, query, values);
    try {
      const res = await this.scylla.execute(query, values, options);
      return res;
    } catch (err) {
      this.scylla.log.warn(`[scylla] table=${this.table}\n`, query);
      this.scylla.log.trace(json || values);
      this.scylla.log.error('[scylla] err ', err);
      throw err;
    }
  }
  async run() {
    this.scylla = await this.app.module('scylla');
  }
}


export default BaseScyllaModel;

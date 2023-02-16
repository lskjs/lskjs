import { isServer } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';

export class Api extends Module {
  transformResponse(raw) {
    // TODO: может перенести в Апи модуль?
    let res;
    if (isServer && typeof raw !== 'string') {
      res = raw;
    } else {
      try {
        res = JSON.parse(raw);
      } catch (err) {
        throw new Err(`API_INVALID_JSON`, err);
      }
    }
    if (res.code) throw new Err(res);
    if (res.count && Array.isArray(res.data)) res.data.count = res.count;
    return res.data;
  }
  async init() {
    await super.init();
    const api = await this.app.module('api');
    // console.log('this', this)
    // console.log('this.log', this.log)
    this.client = await api.createClient({
      baseURL: this.baseURL || this.base || '/api',
      transformResponse: [this.transformResponse.bind(this)],
      log: this.log,
    });
  }
  fetch(...args) {
    return this.request(...args);
  }
  request(...args) {
    if (this.client.fetch) return this.client.fetch(...args);
    return this.client.request(...args);
  }
}

export default Api;

import Err from '@lskjs/err';
import Module from '@lskjs/module';

export class Api extends Module {
  transformResponse(raw) {
    const res = this.transformResponseSimple(raw);
    return res.data;
  }
  transformResponseSimple(raw) {
    let res;
    try {
      res = JSON.parse(raw);
    } catch (err) {
      throw new Err(`API_INVALID_JSON`, err);
    }
    if (res.code) throw new Err(res);
    return res;
  }
  async init() {
    await super.init();
    const api = await this.app.module('api');
    this.client = await api.createClient({
      baseURL: this.baseURL || this.base || '/api',
      transformResponse: [this.transformResponse.bind(this)],
    });
  }
  fetch(...args) {
    // this.log.trace('fetch', args);
    return this.client.request(...args);
  }
}

export default Api;

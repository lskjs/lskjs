import Err from '@lskjs/err';
import Module from '@lskjs/module';
import axios from 'axios';

export class Api extends Module {
  transformResponse(raw) {
    let res;
    try {
      res = JSON.parse(raw);
    } catch (err) {
      throw Err(`API_INVALID_JSON`, err);
    }
    if (res.code) throw new Err(res);
    return res.data;
  }
  async init() {
    await super.init();
    this.client = axios.create({
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

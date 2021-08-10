import Module from '@lskjs/module';
import axios from 'axios';

export class Api extends Module {
  transformResponse(res) {
    return (res && res.data) || res;
  }
  async init() {
    await super.init();
    this.client = axios.create({
      baseURL: this.baseURL || this.base || '/api',
      transformResponse: this.transformResponse.bind(this),
    });
  }
  fetch(...args) {
    // this.log.trace('fetch', args);
    return this.client.request(...args);
  }
}

export default Api;

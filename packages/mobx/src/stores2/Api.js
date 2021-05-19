import Module from '@lskjs/module';
import axios from 'axios';

export class Api extends Module {
  async init() {
    await super.init();
    this.client = axios.create({
      baseURL: this.baseURL || this.base || '/api',
    });
  }
  fetch(...args) {
    // this.log.trace('fetch', args);
    return this.client.request(...args);
  }
}

export default Api;

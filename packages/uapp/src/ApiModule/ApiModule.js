import Module from '@lskjs/module';
import axios from 'axios';

import { fetch } from './fetch';

export class ApiModule extends Module {
  client = axios;
  async init() {
    await super.init();
    this.client = axios.create(this.config);
  }
  setToken(token) {
    this.authToken = token;
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  setAuthToken(token) {
    this.setToken(token);
  }
  fetch = fetch;
  // fetch(...args) {
  //   return this.client(...args);
  // }
  request(...args) {
    return this.client.request(...args);
  }
  get(...args) {
    return this.client.get(...args);
  }
  delete(...args) {
    return this.client.delete(...args);
  }
  head(...args) {
    return this.client.head(...args);
  }
  options(...args) {
    return this.client.options(...args);
  }
  post(...args) {
    return this.client.post(...args);
  }
  put(...args) {
    return this.client.put(...args);
  }
  patch(...args) {
    return this.client.patch(...args);
  }
  all(...args) {
    return this.client.all(...args);
  }
  spread(...args) {
    return this.client.spread(...args);
  }
}

export default ApiModule;

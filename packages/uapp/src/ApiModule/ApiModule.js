import Module from '@lskjs/module';
import axios from 'axios';

import { fetch } from './fetch';

const setToken = (client, token) => {
  if (!token) {
    // eslint-disable-next-line no-param-reassign
    delete client.defaults.headers.common.Authorization;
  } else {
    // eslint-disable-next-line no-param-reassign
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export class ApiModule extends Module {
  // debug = 1;
  client = axios;
  async init() {
    await super.init();
    this.client = axios.create(this.config);
  }
  createClient(props = {}) {
    if (this.debug) this.log.trace('createClient');
    const client = axios.create(props);
    setToken(client, this.authToken);
    this.app.on('api.setToken', ({ token } = {}) => {
      setToken(client, token);
    });
    return client;
  }

  setToken(token) {
    if (this.debug) this.log.trace('setToken', token);
    if (!token) {
      delete this.authToken;
      delete this.client.defaults.headers.common.Authorization;
    } else {
      this.authToken = token;
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    this.app.emit('api.setToken', { token });
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

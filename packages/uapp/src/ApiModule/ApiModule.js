import { isServer } from '@lskjs/env';
import Module from '@lskjs/module';
import axios from 'axios';
import omit from 'lodash/omit';

import { adapter } from './adapter';
// import { fetch } from './fetch';

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
    this.client = this.createClient(this.getConfig());
  }
  getConfig() {
    return omit(this.config, ['log', 'debug']);
  }
  createClient(props = {}) {
    if (this.debug) this.log.trace('createClient');

    const log = props.log && props.log.trace ? props.log : this.log;
    const axiosProps = {
      __parent: this,
      app: this.app,
      ...this.getConfig(),
      ...props,
      log,
      ...(isServer ? { adapter } : {}),
    };
    const client = axios.create(axiosProps);
    client.interceptors.request.use(
      (config) => {
        log.trace('[api]', config.baseURL, config.url, config.data);
        return config;
      },
      (err) => {
        log.error('[api]', err);
        return Promise.reject(err);
      },
    );
    // client.fetch = (...args) => this.fetch(...args); // TODO: подумать в будущем как правильно пропатчить аксиос
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
  // fetch = fetch;
  // fetch(...args) {
  //   return this.client(...args);
  // }
  fetch(...args) {
    return this.client.request(...args);
  }
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

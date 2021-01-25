/* eslint-disable global-require */
import Module from '@lskjs/module';
import map from 'lodash/map';

import defaultHelpers from './helpers';

export default class ServerApp extends Module {
  async model(...args) {
    const modelsModule = await this.module('models');
    return modelsModule.model(...args);
  }

  async getHelpers() {
    return defaultHelpers;
  }

  async init() {
    await super.init();
    const m = await this.module([
      'webserver',
      'i18',
      'db',
      // 'models',
      // 'redis',
    ]);
    Object.assign(this, m);
    this.on('runFinish', this.started.bind(this));
  }

  url(str, params = null) {
    let query = '';
    if (params && Object.keys(params.length)) {
      query = `?${map(params, (val, key) => `${key}=${val}`).join('&')}`;
    }
    return `${this.config.url || this.serverConfig.url || '/'}${str}${query}`;
  }

  getModules() {
    return {
      ...super.getModules(),
      webserver: () => import('./lskjs/webserver/server'),
      i18: () => import('@lskjs/i18/server'),
      db: () => import('@lskjs/db/server'),
      // 'models.User': () => import('@lskjs/db/server'),
      // models: () => import('./lskjs/models/server'),
      // redis: () => import('./lskjs/redis/server'),
    };
  }

  async started() {
    const timing = global.timing ? `[${global.timing()}ms]` : '';
    const rawAddress = this.webserver.httpInstance.address();
    if (!rawAddress) throw '!httpInstance.address';
    const { port, address } = rawAddress;
    const str = `🎃  The server is running at http://${address === '::' ? '127.0.0.1' : address}:${port}/ ${timing}`;
    if (__DEV__) {
      this.log.info(str);
    } else {
      this.log.warn(str);
    }
  }
}

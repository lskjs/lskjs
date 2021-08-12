import { isDev } from '@lskjs/env';
import Module from '@lskjs/module';
import map from 'lodash/map';

import defaultHelpers from './helpers';

export class ServerApp extends Module {
  async model(...args) {
    const modelsModule = await this.module('models');
    return modelsModule.model(...args);
  }

  async getHelpers() {
    return defaultHelpers;
  }

  async init() {
    await super.init();
    this.on('runFinish', this.started.bind(this));
  }

  async run() {
    await super.run();
    await this.module('webserver');
  }

  async initModules() {
    await super.init();
    const m = await this.module([
      'webserver',
      'i18',
      'db',
      // 'models',
      // 'redis',
    ]);
    Object.assign(this, m);
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
      webserver: () => import('@lskjs/webserver/server'),
      i18: () => import('@lskjs/i18/server'),
      db: () => import('@lskjs/db/server'),
      // 'models.User': () => import('@lskjs/db/server'),
      // models: () => import('./lskjs/models/server'),
      // redis: () => import('./lskjs/redis/server'),
    };
  }

  async started() {
    const timing = global.timing ? `[${global.timing()}ms]` : '';
    const rawAddress = this.webserver && this.webserver.httpInstance.address();
    let str;
    if (rawAddress) {
      const { port, address } = rawAddress;
      str = `🎃 The ${this.name} is ready at http://${address === '::' ? '127.0.0.1' : address}:${port}/ ${timing}`;
    } else {
      str = `🎃 The ${this.name} is ready ${timing}`;
    }
    if (isDev) {
      this.log.info(str);
    } else {
      this.log.warn(str);
    }
  }
}

export default ServerApp;

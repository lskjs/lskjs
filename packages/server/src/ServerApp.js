import { isDev } from '@lskjs/env';
import Module from '@lskjs/module';
import map from 'lodash/map';

export class ServerApp extends Module {
  async init() {
    await super.init();
    this.on('runFinish', this.started.bind(this));
  }

  async run() {
    await super.run();
    await this.module('webserver');
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
    };
  }

  async started() {
    const timing = global.timing ? `[${global.timing()}ms]` : '';
    let rawAddress;
    if (this.hasModule('webserver') && this.__initedModules.webserver) {
      const webserver = await this.module('webserver');
      rawAddress = webserver.httpInstance.address();
    }
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
  healthchecks() {
    const healthchecks = {};
    Object.keys(this.__initedModules).forEach((moduleName) => {
      healthchecks[moduleName] = async () => {
        const m = await this.module(moduleName);
        if (!m.healthcheck) return null;
        return m.healthcheck();
      };
    });
    return healthchecks;
  }
}

export default ServerApp;

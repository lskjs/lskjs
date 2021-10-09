import Module from '@lskjs/module';
import { isDev } from '@lskjs/utils/env';

export class SampleApp extends Module {
  preload = true;
  async init() {
    await super.init();
    this.on('runFinish', () => this.started());
  }
  async run() {
    await super.run();
    if (this.preload) {
      if (this.hasModule('db')) await this.module('db');
      if (this.hasModule('esModels')) await this.module('esModels');
      if (this.hasModule('elastic')) await this.module('elastic');
      if (this.hasModule('models')) await this.module('models.*');
    }
    await this.runWorkers();
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

export default SampleApp;

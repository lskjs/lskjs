import Err from '@lskjs/err';
import { Module } from '@lskjs/module';
import axios from 'axios';

export class RlogClientModule extends Module {
  getOptions() {
    return {
      baseURL: '/api/rlog',
    };
    // const options = omit(this.config, ['log', 'debug']);
    // if (this.config.logs) {
    //   options.log = this.log;
    // }
    // return options;
  }
  async init() {
    await super.init();
    this.client = axios.create(this.getOptions());
  }
  send(msg, options) {
    if (!this.client) throw new Err('!this.client');
    this.log.trace(msg);
    return this.client({
      method: 'POST',
      url: '/send',
      data: {
        level: 'send',
        msg,
        options,
      },
    });
  }
  trace(msg, options) {
    if (!this.client) throw new Err('!this.client');
    this.log.trace(msg);
    return this.client({
      method: 'POST',
      url: '/send',
      data: {
        level: 'trace',
        msg,
        options,
      },
    });
  }
  success(msg, options) {
    if (!this.client) throw new Err('!this.client');
    this.log.success(msg);
    return this.client({
      method: 'POST',
      url: '/send',
      data: {
        level: 'success',
        msg,
        options,
      },
    });
  }
  warn(msg, options) {
    if (!this.client) throw new Err('!this.client');
    this.log.warn(msg);
    return this.client({
      method: 'POST',
      url: '/send',
      data: {
        level: 'warn',
        msg,
        options,
      },
    });
  }
  error(msg, options) {
    if (!this.client) throw new Err('!this.client');
    this.log.error(msg);
    return this.client({
      method: 'POST',
      url: '/send',
      data: {
        level: 'error',
        msg,
        options,
      },
    });
  }
  fatal(msg, options) {
    if (!this.client) throw new Err('!this.client');
    this.log.fatal(msg);
    return this.client({
      method: 'POST',
      url: '/send',
      data: {
        level: 'fatal',
        msg,
        options,
      },
    });
  }
}

export default RlogClientModule;

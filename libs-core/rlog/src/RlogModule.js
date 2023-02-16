import Err from '@lskjs/err';
import { Module } from '@lskjs/module';
import omit from 'lodash/omit';

import { Rlog } from './Rlog';

export class RlogModule extends Module {
  getOptions() {
    const options = omit(this.config, ['log', 'debug']);
    if (this.config.logs) {
      options.log = this.log;
    }
    return options;
  }
  async init() {
    await super.init();
    this.client = new Rlog(this.getOptions());
  }
  send(...args) {
    if (!this.client) throw new Err('!this.client');
    return this.client.send(...args);
  }
  trace(...args) {
    if (!this.client) throw new Err('!this.client');
    return this.client.trace(...args);
  }
  success(...args) {
    if (!this.client) throw new Err('!this.client');
    return this.client.success(...args);
  }
  warn(...args) {
    if (!this.client) throw new Err('!this.client');
    return this.client.warn(...args);
  }
  error(...args) {
    if (!this.client) throw new Err('!this.client');
    return this.client.error(...args);
  }
  fatal(...args) {
    if (!this.client) throw new Err('!this.client');
    return this.client.fatal(...args);
  }
}

export default RlogModule;

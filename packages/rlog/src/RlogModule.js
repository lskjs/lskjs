import Err from '@lskjs/err';
import { Module } from '@lskjs/module';
import omit from 'lodash/omit';

import { Rlog } from './Rlog';

export class RlogModule extends Module {
  getOptions() {
    return omit(this.config, ['log', 'debug']);
  }
  async init() {
    await super.init();
    this.logger = new Rlog(this.getOptions());
  }
  send(...args) {
    if (!this.logger) throw new Err('!this.logger');
    return this.logger.send(...args);
  }
  trace(...args) {
    if (!this.logger) throw new Err('!this.logger');
    return this.logger.trace(...args);
  }
  success(...args) {
    if (!this.logger) throw new Err('!this.logger');
    return this.logger.success(...args);
  }
  warn(...args) {
    if (!this.logger) throw new Err('!this.logger');
    return this.logger.warn(...args);
  }
  error(...args) {
    if (!this.logger) throw new Err('!this.logger');
    return this.logger.error(...args);
  }
  fatal(...args) {
    if (!this.logger) throw new Err('!this.logger');
    return this.logger.fatal(...args);
  }
}

export default RlogModule;

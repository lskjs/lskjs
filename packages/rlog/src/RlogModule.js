import Module from '@lskjs/module';
import Rlog from './Rlog';

export default class RlogModule extends Module {
  name = 'RlogModule';
  async init() {
    await super.init();
    this.config = this.app.config.rlog || this.app.config.notifyLogger;
    // this.config = get(this, 'app.config.rlog', get(this, 'app.config.notifyLogger'))
    this.logger = new Rlog(this.config);
  }
  send(...args) {
    if (!this.logger) throw '!this.logger';
    return this.logger.send(...args);
  }
  trace(...args) {
    if (!this.logger) throw '!this.logger';
    return this.logger.trace(...args);
  }
  success(...args) {
    if (!this.logger) throw '!this.logger';
    return this.logger.success(...args);
  }
  warn(...args) {
    if (!this.logger) throw '!this.logger';
    return this.logger.warn(...args);
  }
  error(...args) {
    if (!this.logger) throw '!this.logger';
    return this.logger.error(...args);
  }
  fatal(...args) {
    if (!this.logger) throw '!this.logger';
    return this.logger.fatal(...args);
  }
}

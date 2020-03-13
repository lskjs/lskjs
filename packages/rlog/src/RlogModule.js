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
    return this.logger.send(...args);
  }
  trace(...args) {
    return this.logger.trace(...args);
  }
  success(...args) {
    return this.logger.success(...args);
  }
  warn(...args) {
    return this.logger.warn(...args);
  }
  error(...args) {
    return this.logger.error(...args);
  }
  fatal(...args) {
    return this.logger.fatal(...args);
  }
}

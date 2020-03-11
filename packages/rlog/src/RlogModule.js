import Module from '@lskjs/module';
import Rlog from './Rlog';

export default class RlogModule extends Module {
  name = 'RlogModule';
  getEvents() {
    return {};
  }
  async init() {
    await super.init();
    this.config = this.app.config.rlog || this.app.config.notifyLogger;
    this.logger = new Rlog(this.config);
  }
}

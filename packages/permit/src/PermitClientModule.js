import Module from '@lskjs/module';

export default class PermitClientModule extends Module {
  name = 'PermitClientModule';
  async init() {
    await super.init();
    this.stores = require('./stores').default(this.app);
  }
}

import Module from '@lskjs/module';

export class PermitClientModule extends Module {
  async init() {
    await super.init();
    this.stores = require('./stores').default(this.app);
  }
}

export default PermitClientModule;

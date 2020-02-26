import Module from '@lskjs/module';

export default class PermitClientModule extends Module {
  name = 'PermitServerModule';
  init() {
    this.stores = require('./stores').default(this.app);
  }
}

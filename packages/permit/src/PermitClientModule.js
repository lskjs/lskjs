export default class PermitClientModule {
  init() {
    this.stores = require('./stores').default(this.app);
  }
}

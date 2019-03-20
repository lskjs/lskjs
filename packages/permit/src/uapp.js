export default ctx => class Permit {
  init() {
    this.stores = require('./uapp/stores').default(ctx);
  }
};

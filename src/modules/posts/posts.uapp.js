export default ctx => ({

  init() {
    this.components = require('./components').default(ctx, this);
    this.stores = require('./mobx').default(ctx, this);
    this.router = require('./router').default;//(ctx, this);
  },

});

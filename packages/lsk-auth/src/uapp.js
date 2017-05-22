export default (ctx) => {
  return {
    init() {
      this.components = require('./uapp/components').default(ctx);
      this.socials = require('./uapp/socials').default;// (ctx);
      // this.models = require('./uapp/models').default(ctx);
      this.stores = require('./uapp/stores').default(ctx);
      this.router = require('./uapp/router').default;
    },
  };
};

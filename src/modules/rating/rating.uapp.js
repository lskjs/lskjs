export default (ctx) => {
  return {
    init() {
      this.components = require('./components').default(ctx);
    }
  };
};

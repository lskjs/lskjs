
export default ctx => class PermitModule {
  getModels() {
    return require('./server/models').default(ctx, this);
  }

  async init() {
    this.models = this.getModels();
  }

  async run() {
    ctx.app.use('/api/module/auth', require('./server/api').default(ctx));
  }
};

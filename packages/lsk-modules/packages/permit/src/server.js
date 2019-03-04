
export default app => class PermitModule {
  getModels() {
    return require('./server/models').default(app, this);
  }

  async init() {
    this.models = this.getModels();
  }

  async run() {
  }
};

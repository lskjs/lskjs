export default class PermitServerModule {
  getModels() {
    return require('./models').default(this.app);
  }

  async init() {
    this.models = this.getModels();
  }
}

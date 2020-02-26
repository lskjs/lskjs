import Module from '@lskjs/module';

export default class PermitServerModule extends Module {
  name = 'PermitServerModule';
  getModels() {
    return require('./models').default(this.app);
  }

  async init() {
    await super.init();
    this.models = this.getModels();
  }
}

import Module from '../src/2';

export default class ExampleModule extends Module {
  async init(): Promise<void> {
    await super.init();
    if (!this.config) {
      if (!this.app?.config?.bots) {
        this.log.warn('!config');
        return;
      } 
      this.config = this.app.config.bots;
    }
    this.log.debug('config', this.config);
  }
}

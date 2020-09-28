import Module from '@lskjs/module';

export default class BotProvider extends Module {
  name = 'BotProvider';
  async init() {
    if (!this.config) throw '!config';
  }
}
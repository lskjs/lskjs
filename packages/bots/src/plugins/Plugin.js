import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';

export default class Plugin extends Module {
  name = 'Plugin';
  canRunBot(bot) {
    return !(Array.isArray(this.providers) && !this.providers.includes(bot.provider));
  }
  async init() {
    await super.init();
    await this.initBots();
  }
  async initBots() {
    await asyncMapValues(this.bots, async (bot, name) => {
      if (!this.canRunBot(bot)) return;
      await this.initBot(bot, name);
      await bot.initPlugin(this);
    });
  }
  async run() {
    await super.run();
    await this.runBots();
  }
  async runBots() {
    await asyncMapValues(this.bots, async (bot, name) => {
      if (!this.canRunBot(bot)) return;
      await this.runBot(bot, name);
      await bot.runPlugin(this);
    });
  }
}

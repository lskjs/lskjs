import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Module from '@lskjs/module';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import { IBotPlugin, IBotProvider } from '../types';

export abstract class BaseBotPlugin extends Module implements IBotPlugin {
  botsModule;
  providers: string[] = [];
  bots = {};

  // abstract
  canRunBot(bot: IBotProvider): boolean {
    if (!Array.isArray(this.providers) || !this.providers.length) return true;
    return this.providers.includes(bot.provider);
  }

  async initBot(bot: IBotProvider, name: string): Promise<void> {
    // abstract
  }
  async initBots(): Promise<void> {
    await asyncMapValues(this.bots, async (bot: IBotProvider, name: string) => {
      if (!this.canRunBot(bot)) return;
      await this.initBot(bot, name);
      await bot.initPlugin(this, name);
    });
  }
  async init(): Promise<void> {
    await super.init();
    await this.initBots();
  }

  async runBot(bot: IBotProvider, name: string): Promise<void> {
    // abstract
  }
  async runBots(): Promise<void> {
    if (this.debug) this.log.trace('runBots', Object.keys(this.bots));
    await asyncMapValues(this.bots, async (bot: IBotProvider, name: string) => {
      if (this.debug) this.log.trace('this.canRunBot(bot)', name, this.canRunBot(bot));
      if (!this.canRunBot(bot)) return;
      await this.runBot(bot, name);
      await bot.runPlugin(this, name);
    });
  }
  async run(): Promise<void> {
    await super.run();
    await this.runBots();
  }
}

export default BaseBotPlugin;

import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Module from '@lskjs/module/2';
import { IBotPlugin, IBotProvider } from '../types';

// extends Module
export class BotPlugin extends Module implements IBotPlugin {
  // abstract
  canRunBot(bot: IBotProvider): boolean {
    return false;
    // return !(Array.isArray(this.providers) && !this.providers.includes(bot.provider));
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
    await asyncMapValues(this.bots, async (bot: IBotProvider, name: string) => {
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

export default BotPlugin;

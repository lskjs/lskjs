/* eslint-disable @typescript-eslint/interface-name-prefix */
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Module from '../module2';
import { IBotProvider } from '../providers/BotProvider';

export interface IBotPlugin {
  canRunBot(bot: IBotProvider): boolean;
  initBot(bot: IBotProvider, name: string): Promise<void>;
  initBots(): Promise<void>;
  runBot(bot: IBotProvider, name: string): Promise<void>;
  runBots(): Promise<void>;
}

export class BotPlugin extends Module implements IBotPlugin {
  canRunBot(bot: IBotProvider): boolean {
    return !(Array.isArray(this.providers) && !this.providers.includes(bot.provider));
  }
  
  abstract async initBot(bot: IBotProvider, name: string): Promise<void>;
  async initBots(): Promise<void> {
    await asyncMapValues(this.bots, async (bot: IBotProvider, name: string) => {
      if (!this.canRunBot(bot)) return;
      await this.initBot(bot, name);
      await bot.initPlugin(this);
    });
  }
  async init(): Promise<void> {
    await super.init();
    await this.initBots();
  }

  abstract async runBot(bot: IBotProvider, name: string): Promise<void>;
  async runBots(): Promise<void> {
    await asyncMapValues(this.bots, async (bot: IBotProvider, name: string) => {
      if (!this.canRunBot(bot)) return;
      await this.runBot(bot, name);
      await bot.runPlugin(this);
    });
  }
  async run(): Promise<void> {
    await super.run();
    await this.runBots();
  }
}

export default BotPlugin;
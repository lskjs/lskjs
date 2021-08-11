/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBotPlugin, IBotProvider } from '@lskjs/bots-base/types';
import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';

export abstract class BaseBotPlugin extends Module implements IBotPlugin {
  botsModule: any;
  providers: string[] = [];
  bots = {};
  async getConfig(): Promise<Record<string, any>> {
    return {
      enable: true,
      ...(await super.getConfig()),
    };
  }

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
    if (!(this.config && this.config.enable)) {
      this.log.warn(`${this.name} is not enabled`);
      return;
    }
    await this.runBots();
  }
}

export default BaseBotPlugin;

import Bluebird from 'bluebird';
import Module from '@lskjs/module';
import get from 'lodash/get';
import importFn from '@lskjs/utils/importFn';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import providers from './providers';

export default class BotsModule extends Module {
  providers = providers;
  async getPlugins() {
    return {
      DebugPlugin: () => import('./plugins/DebugPlugin'),
    }
  }
  async init() {
    this.config = this.app.config.bots;
    if (!this.config) return this.log.warn('!config');
    const { info, ...botsConfigs } = this.config;
    const assign = get(info, 'assign', true);


    this.bots = await asyncMapValues(botsConfigs, async (config, name) => {
      const { provider } = config;
      if (!provider) {
        this.log.warn(`Empty provider for bot '${name}'`);
        return null;
      }
      if (!this.providers[provider]) {
        this.log.warn(`Can't find provider '${provider}' for bot '${name}'`);
        return null;
      }
      const Provider = await importFn(this.providers[provider]);
      const bot = new Provider({ app: this.app, botsModule: this, config, name });
      await bot.init();
      return bot;
    });
    this.log.debug('bots', Object.keys(this.bots));


    this.plugins = await asyncMapValues(await this.getPlugins(), async (pluginFn, name) => {
      const Plugin = await importFn(pluginFn);
      const plugin = new Plugin({ app: this.app, botsModule: this, bots: this.bots });
      await plugin.start();
      return plugin;
    });
    this.log.debug('plugins', Object.keys(this.plugins));


    await asyncMapValues(this.bots, (bot) => this.applyPluginsForBot(bot));

    if (assign) Object.assign(this, this.bots);
  }
  async applyPluginsForBot(bot) {
    await asyncMapValues(this.plugins, (plugin) => {
      await this.applyPluginForBot({ bot, plugin });
    });
  }
  async applyPluginForBot({ bot, plugin }) {
    if (Array.isArray(plugin.providers) && !plugin.providers.includes(bot.plugin)) {
      
      return ;
    }
    bot.on('*', plugin.emit)
  }
  async run() {
    if (!this.config) return;
    await asyncMapValues(this.bots, (bot) => bot.run());
  }
}

import Module from '@lskjs/module';
import get from 'lodash/get';
// import importFn from '@lskjs/utils/importFn';
import isFunction from '@lskjs/utils/isFunction';
import undefault from '@lskjs/utils/undefault';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import providers from './providers';

const importFn = async (fn) => {
  let module;
  if (isFunction(fn)) {
    module = await fn();
  } else {
    module = await fn;
  }
  return undefault(module);
};

export default class BotsModule extends Module {
  name = 'BotsModule';
  providers = providers;
  async getPlugins() {
    return {
      DebugPlugin: () => import('./plugins/DebugPlugin'),
      CatsPlugin: () => import('./plugins/CatsPlugin'),
      ExamplePlugin: () => import('./plugins/ExamplePlugin'),
      PortalPlugin: () => import('./plugins/PortalPlugin'),
    };
  }
  // async getPlugins() {
  //   return import('./plugins');
  // }
  // async getPlugins() {
  //   return require('./plugins').default;
  // }
  // async getModels() {
  //   return import('./models');
  // }
  getModels() {
    return require('./models').default;
  }
  async init() {
    await super.init();
    this.config = this.app.config.bots;
    if (!this.config) {
      this.log.warn('!config');
      return;
    }
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

    this.plugins = await asyncMapValues(await this.getPlugins(), async (pluginFn) => {
      const Plugin = await importFn(pluginFn);
      const plugin = new Plugin({ app: this.app, botsModule: this, bots: this.bots });
      await plugin.init();
      return plugin;
    });
    this.log.debug('plugins', Object.keys(this.plugins));

    if (assign) Object.assign(this, this.bots);
  }
    async run() {
      await super.run();
      if (!this.config) return;
      await asyncMapValues(this.bots, (bot) => bot.run());
      await asyncMapValues(this.plugins, (plugin) => plugin.run());
      this.log.debug(
        'bots x plugins',
      await asyncMapValues(this.bots, async (bot) => bot.plugins.map((plugin) => plugin.name)),
    );
  }
}

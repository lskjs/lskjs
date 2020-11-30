import importFn from '@lskjs/utils/importFn';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import assignProps from '@lskjs/utils/assignProps';
import Module from '@lskjs/module/2';
import { EventEmitter } from 'events';
import providers from './providers/async';
import plugins from './plugins/async';
import { IBotProvider, AsyncProvidersType, AsyncPluginsType } from './types';

export default class BotsModule extends Module {
  providers: AsyncProvidersType = providers;
  plugins: AsyncPluginsType = {};
  bots: {
    [name: string]: IBotProvider;
  };
  v: string;

  constructor(...props: any[]) {
    super(...props);

    try {
      this.v = require('./package.json').version;
    } catch (err) {
      console.log(err);
    }

    assignProps(this, ...props);
  }

  createEventEmitter() {
    return new EventEmitter();
  }

  async getPlugins() {
    return {
      ...plugins,
      ...(this.plugins || {}),
    };
  }

  async getProviders() {
    return {
      ...providers,
      ...(this.providers || {}),
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
  getModels(): Promise<any> {
    return require('./models').default;
  }
  async init(): Promise<void> {
    await super.init();
    if (!this.config) {
      if (this.app.config.bots) {
        this.config = this.app.config.bots;
      } else {
        this.log.warn('!config');
        return;
      }
    }
    // console.log('this.app.config.bots', this.app.config.bots)
    // console.log(this.config)
    const { assignProviders = true, providers: providersConfigs, plugins: pluginsConfig } = this.config;
    const providers = await this.getProviders(); // eslint-disable-line no-shadow
    this.log.debug('providers', Object.keys(providers));
    this.bots = await asyncMapValues(providersConfigs, async (config, key) => {
      // this.log.info({key, config})
      const { provider } = config;
      if (!provider) {
        this.log.warn(`Empty provider for bot '${key}'`);
        return null;
      }
      if (!providers[provider]) {
        this.log.warn(`Can't find provider '${provider}' for bot '${key}'`);
        return null;
      }
      const Provider = await importFn(providers[provider]);
      const bot = new Provider({ app: this.app, botsModule: this, config, key });
      // this.log.info(111, bot.config, !!bot.app, bot.key)
      await bot.init();
      // this.log.info(222, bot.config, !!bot.app, bot.key)
      return bot;
    });
    this.log.debug('bots', Object.keys(this.bots));

    const currentPlugins = await this.getPlugins();
    this.plugins = await asyncMapValues(currentPlugins, async (pluginFn, name) => {
      const Plugin = await importFn(pluginFn);
      // if (__DEV__) console.log({ Plugin });
      const plugin = new Plugin({
        app: this.app,
        botsModule: this,
        bots: this.bots,
        config: (pluginsConfig && pluginsConfig[name]) || {},
      });
      await plugin.init();
      return plugin;
    });
    this.log.debug('plugins', Object.keys(this.plugins));

    if (assignProviders) Object.assign(this, this.bots);
  }
  async run(): Promise<void> {
    await super.run();
    if (!this.config) return;
    await asyncMapValues(this.bots, (bot) => bot.run());
    await asyncMapValues(this.plugins, (plugin) => plugin.run());
    this.log.debug(
      'bots x plugins',
      await asyncMapValues(this.bots, async (bot) => (bot.plugins || []).map((plugin) => plugin.name)),
    );
  }
}

import importFn from '@lskjs/utils/importFn';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import assignProps from '@lskjs/utils/assignProps';
import Module from './module2';
import providers from './providers/async';
import { IBotProvider } from './providers/BotProvider';
import { IBotPlugin } from './plugins/BotPlugin';

export type AsyncProvidersType = {
  [key: string]: IBotProvider;
};
export type AsyncPluginsType = {
  [key: string]: IBotPlugin;
};

export default class BotsModule extends Module {
  providers: AsyncProvidersType = providers;
  plugins: AsyncPluginsType = {};
  constructor(...props) {
    super(...props);
    assignProps(this, ...props);
  }
  async getPlugins() {
    return {
      DebugPlugin: () => import('./plugins/DebugPlugin'),
      // CatsPlugin: () => import('./plugins/CatsPlugin'),
      // ExamplePlugin: () => import('./plugins/ExamplePlugin'),
      // PortalPlugin: () => import('./plugins/PortalPlugin'),
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
    const { assignProviders = true, providers: providersConfigs, plugins: pluginsConfig } = this.config;
    const providers = await this.getProviders(); // eslint-disable-line no-shadow
    this.bots = await asyncMapValues(providersConfigs, async (config, key) => {
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
      await bot.init();
      return bot;
    });
    this.log.debug('bots', Object.keys(this.bots));

    const plugins = await this.getPlugins();
    this.plugins = await asyncMapValues(plugins, async (pluginFn, name) => {
      const Plugin = await importFn(pluginFn);
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
      await asyncMapValues(this.bots, async (bot) => bot.plugins.map((plugin) => plugin.name)),
    );
  }
}

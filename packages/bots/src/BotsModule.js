import Module from '@lskjs/module';
import importFn from '@lskjs/utils/importFn';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import providers from './providers';

export default class BotsModule extends Module {
  name = 'BotsModule';
  providers = providers;
  plugins = {};
  async getPlugins() {
    return {
      DebugPlugin: () => import('./plugins/DebugPlugin'),
      // CatsPlugin: () => import('./plugins/CatsPlugin'),
      // ExamplePlugin: () => import('./plugins/ExamplePlugin'),
      // PortalPlugin: () => import('./plugins/PortalPlugin'),
      ...this.plugins,
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
    if (!this.config) {
      if (this.app.config.bots) {
        this.config = this.app.config.bots;
      } else {
        this.log.warn('!config');
        return;
      }
    }
    const { assignProviders = true, providers: providersConfigs, plugins: pluginsConfig } = this.config;

    this.bots = await asyncMapValues(providersConfigs, async (config, name) => {
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
      const plugin = new Plugin({
        app: this.app,
        botsModule: this,
        bots: this.bots,
        config: pluginsConfig[name] || {},
      });
      await plugin.init();
      return plugin;
    });
    this.log.debug('plugins', Object.keys(this.plugins));

    if (assignProviders) Object.assign(this, this.bots);
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

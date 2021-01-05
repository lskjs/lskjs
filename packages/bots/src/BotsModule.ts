import importFn from '@lskjs/utils/importFn';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import assignProps from '@lskjs/utils/assignProps';
import Module from '@lskjs/module/2';
import { ILogger } from '@lskjs/module/module2/types';
import pickBy from 'lodash/pickBy';
import flatten from 'lodash/flatten';
import providers from './providers/async';
import plugins from './plugins/async';
import { BotsRouter } from './utils/BotsRouter';
import { IBotProvider, IAsyncProviders, IAsyncPlugins, IAnyKeyValue } from './types';

export default class BotsModule extends Module {
  providers: IAsyncProviders = providers;
  plugins: IAsyncPlugins = {};
  log: ILogger;
  bots: {
    [name: string]: IBotProvider;
  };
  v: string;
  routes: any;
  routers: any;

  assignProps(...props: any[]): void {
    super.assignProps(...props);
    try {
      this.v = require('./package.json').version;
    } catch (err) {
      console.log(err);
    }
  }

  async getPlugins(): Promise<IAnyKeyValue> {
    return {
      ...plugins,
      ...(this.plugins || {}),
    };
  }

  async getProviders(): Promise<IAnyKeyValue> {
    return {
      ...providers,
      ...(this.providers || {}),
    };
  }

  async getRoutes(): Promise<any[]> {
    const plugingRoutes = await asyncMapValues(this.plugins, async (plugin) => {
      if (plugin && plugin.getRoutes) {
        const routes = await plugin.getRoutes();
        if (!Array.isArray(routes)) return [routes];
        return routes;
      }
      return [];
    });
    return [
      ...flatten(Object.values(plugingRoutes)),
      {
        path: '/start',
        action: this.onStart.bind(this),
      },
      {
        path: '(.*)',
        action({ path, log }: any) {
          log.error('404', path);
          return true;
        },
      },
    ];
  }

  async onStart({ ctx, path }: any) {
    await ctx.reply(`Hello LSK world`);
    // const createButtons = (value) => {
    //   if (Array.isArray(value)) return value.map(createButtons);
    //   return Markup.callbackButton(value, value);
    // };
    // const buttons = [
    //   ['/start', '/menu', '/menu/submenu'],
    //   ['/menu/submenu/1', '/menu/submenu/2', '/menu/submenu/4'],
    // ];

    // const content = `Hello LSK world`;

    // await ctx.reply(content);

    // // await ctx.editMessageText();
    // // await ctx.answerCbQuery();

    // // await ctx.replyWithChatAction('typing');
    // // await Bluebird.delay(500);
    // // await ctx.editMessageText(this.app.i18.t('bot.city.enter'));
    // // await ctx.answerCbQuery();
    // return true;
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
      if (!this.app?.config?.bots) {
        this.log.warn('!config');
        return;
      } 
      this.config = this.app.config.bots;
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
      return Provider.create({ app: this.app, botsModule: this, config, key });
    });

    this.log.debug('bots', Object.keys(this.bots));
    const currentPlugins = await this.getPlugins();
    this.plugins = await asyncMapValues(currentPlugins, async (pluginFn, name) => {
      const Plugin = await importFn(pluginFn);
      const pluginConfig = pluginsConfig && pluginsConfig[name];
      // if (__DEV__) this.log.trace({ Plugin, pluginConfig });
      if (pluginConfig === false) return null;
      return Plugin.create({
        app: this.app,
        botsModule: this,
        bots: this.bots,
        config: pluginConfig || {},
      });
    });
    this.plugins = pickBy(this.plugins, Boolean);
    this.log.debug('plugins', Object.keys(this.plugins));

    this.routes = await this.getRoutes();
    this.log.debug(
      'Bots.routes',
      this.routes.map((c) => c.path),
    );

    this.routers = await asyncMapValues(this.bots, async (bot) => {
      return BotsRouter.create({
        app: this.app,
        botsModule: this,
        bots: this.bots,
        bot,
        routes: this.routes,
      }, { asd: 123});
    });

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

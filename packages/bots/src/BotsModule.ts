import { IAnyKeyValue, IAsyncPlugins, IAsyncProviders, IBotProvider } from '@lskjs/bots-base/types';
import { BotsRouter } from '@lskjs/bots-router';
import { IModel, IModelKeyValue, IModelsModule } from '@lskjs/db';
import { IAsyncModuleKeyValue, ILogger, Module } from '@lskjs/module';
import { createAsyncModule } from '@lskjs/module/utils/createAsyncModule';
// import asyncMapValues from '@lskjs/utils/asyncMapValues';
// @ts-ignore
import importFn from '@lskjs/utils/importFn';
import Bluebird from 'bluebird';
import flatten from 'lodash/flatten';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';

import models from './models';
import plugins from './plugins';
import providers from './providers';
// import { Dictionary, NumericDictionary, DictionaryIterator } from '@types/lodash';

// export default <T>(
//   obj: Dictionary<T> | NumericDictionary<T> | null | undefined,
//   callback: string | DictionaryIterator<T, any>,
// ): Promise<Dictionary<any>> => Bluebird.props(mapValues(obj, callback)); // @ts-ignore

type Dictionary<T> = {
  [key: string]: T;
};

export const asyncMapValues = <T>(
  obj: Dictionary<T>,
  callback: (value: T, key: string) => Promise<unknown>,
): Promise<Dictionary<any>> => Bluebird.props(mapValues(obj, callback));

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
  config: {
    providers: Record<
      string,
      {
        provider: string;
        [name: string]: unknown;
      }
    >;
    plugins: Record<string, unknown>;
    [name: string]: unknown;
  };

  setProps(...props: any[]): void {
    super.setProps(...props);
    try {
      // eslint-disable-next-line import/no-unresolved
      this.v = require('./package.json').version;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('setProps err', err);
    }
  }

  async getConfig(): Promise<Record<string, any>> {
    const config =  {
      ...(this.config || {}),
      ...(this.__config || {}),
      providers: {
        ...(this.config.providers || {}),
        ...(this.__config.providers || {}),
      },
      plugins: {
        ...(this.config.plugins || {}),
        ...(this.__config.plugins || {}),
      },
    };
    return config;
  }

  async model(...args: any[]): Promise<IModel | IModelKeyValue> {
    const modelsModule = (await this.module('models')) as IModelsModule;
    // @ts-ignore
    return modelsModule.model(...args);
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
    const plugingRoutes = await asyncMapValues(this.plugins, async (plugin: any) => {
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

  async onStart({ ctx }: any): Promise<void> {
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

  async getModules(): Promise<IAsyncModuleKeyValue> {
    return {
      ...super.getModules(),
      models: [() => import('@lskjs/db/models'), { models }],
    };
  }

  async init(): Promise<void> {
    await super.init();
    // console.log('this.app.config.bots', this.app.config.bots)
    // console.log(this.config)
    const { assignProviders = true, providers: providersConfigs, plugins: pluginsConfig } = this.config;
    const providers = await this.getProviders(); // eslint-disable-line no-shadow
    this.log.debug('providers', Object.keys(providers));
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
      return createAsyncModule(providers[provider], {
        app: this.app,
        botsModule: this,
        config,
        key,
      });
      // const Provider = await importFn(providers[provider]);
      // return Provider.create({ app: this.app, botsModule: this, config, key });
    });

    this.log.debug('bots', Object.keys(this.bots));
    const currentPlugins = await this.getPlugins();
    this.plugins = await asyncMapValues(currentPlugins, async (pluginFn, name) => {
      const pluginConfig = pluginsConfig && pluginsConfig[name];
      return createAsyncModule(pluginFn, {
        app: this.app,
        __parent: this,
        botsModule: this,
        bots: this.bots,
        config: pluginConfig || {},
      });

      // const pluging = await this.module(`plugins.${name}`);
      const Plugin = await importFn(pluginFn);
      // if (__DEV__) this.log.trace({ Plugin, pluginConfig });
      if (pluginConfig === false) return null;
      return Plugin.create({
        app: this.app,
        __parent: this,
        botsModule: this,
        bots: this.bots,
        config: pluginConfig || {},
      });
    });
    // @ts-ignore
    this.plugins = pickBy(this.plugins, Boolean);
    this.log.debug('plugins', Object.keys(this.plugins));

    this.routes = await this.getRoutes();
    this.log.debug(
      'Bots.routes',
      this.routes.map((c: any) => c.path),
    );

    this.routers = await asyncMapValues(this.bots, async (bot) =>
      BotsRouter.create({
        app: this.app,
        __parent: this,
        botsModule: this,
        bots: this.bots,
        bot,
        routes: this.routes,
      }),
    );

    if (assignProviders) Object.assign(this, this.bots);
  }
  async run(): Promise<void> {
    await super.run();
    if (!this.config) return;
    await asyncMapValues(this.bots, (bot) => bot.__run());
    await asyncMapValues(this.plugins, (plugin: any) => plugin.__run());
    this.log.debug(
      'bots x plugins',
      await asyncMapValues(this.bots, async (bot) => (bot.plugins || []).map((plugin: any) => plugin.name)),
    );
  }
}

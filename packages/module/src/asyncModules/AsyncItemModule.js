import { ItemModule } from '@lskjs/module/items/ItemModule';
import createAsyncModule from '@lskjs/module/utils/createAsyncModule';

export class AsyncItemModule extends ItemModule {
  async createItem() {
    // return createAsyncModule(this.__item);
    // console.log('AsyncItemModule.this', this)
    // console.log('AsyncItemModule.this.config', this.config)
    return createAsyncModule(this.__item, {
      __parent: this.__parent,
      app: this.app,
      config: this.config,
    });
  }
}

// async init(): Promise<void> {
//   await super.init();
//   // console.log('this.app.config.bots', this.app.config.bots)
//   // console.log(this.config)
//   const { assignProviders = true, providers: providersConfigs, plugins: pluginsConfig } = this.config;
//   const providers = await this.getProviders(); // eslint-disable-line no-shadow
//   this.log.debug('providers', Object.keys(providers));
//   this.bots = await asyncMapValues(providersConfigs, async (config, key) => {
//     const { provider } = config;
//     if (!provider) {
//       this.log.warn(`Empty provider for bot '${key}'`);
//       return null;
//     }
//     if (!providers[provider]) {
//       this.log.warn(`Can't find provider '${provider}' for bot '${key}'`);
//       return null;
//     }
//     return createAsyncModule(providers[provider], {
//       __parent: this,
//       app: this.app,
//       botsModule: this,
//       config,
//       key,
//     });
//     // const Provider = await importFn(providers[provider]);
//     // return Provider.create({ app: this.app, botsModule: this, config, key });
//   });

export default AsyncItemModule;

import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Err from '@lskjs/utils/Err';
import importFn from '@lskjs/utils/importFn';

import availableProviders from './providers';

export default class BillingServerModule extends Module {
  availableProviders = availableProviders;
  providers = {};
  async getProviders() {
    return {
      ...availableProviders,
      ...(this.availableProviders || {}),
    };
  }
  getModels() {
    return require('./models').default;
  }
  provider(name) {
    if (!this.providers[name]) throw new Err('!provider', { data: { name } });
    return this.providers[name];
  }
  async init() {
    await super.init();
    this.log.debug('availableProviders', Object.keys(this.availableProviders));
    const { providers: providersConfigs } = this.config;
    const availableProviders = await this.getProviders(); // eslint-disable-line no-shadow

    this.providers = await asyncMapValues(providersConfigs, async (config, name) => {
      const { provider: providerName } = config;
      if (!providerName) {
        this.log.warn(`Empty provider for '${name}'`);
        return null;
      }
      if (!availableProviders[providerName]) {
        this.log.warn(`Can't find provider '${providerName}' for '${name}'`);
        return null;
      }
      const Provider = await importFn(availableProviders[providerName]);
      const provider = await Provider.create({ app: this.app, module: this, config, name });
      return provider;
    });
    this.log.debug('providers', Object.keys(this.providers));
  }

  async run() {
    await super.run();
    if (!this.config) return;
    await asyncMapValues(this.providers, (provider) => provider && provider.run());
  }
}

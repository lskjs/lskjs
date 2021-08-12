import Err from '@lskjs/err';
import Module from '@lskjs/module';
import importFn from '@lskjs/utils/importFn';

export class StoreModule extends Module {
  Store = null;
  store = null;
  async init() {
    await super.init();
    if (!this.Store) throw new Err('!this.Store');
  }
  async run() {
    await super.run();
    const Store = await importFn(this.Store);
    this.store = Store;
    const { Api } = this.store;
    if (!Api) throw new Err('!Store.Api');
    const api = await Api.create({ app: this.app });
    this.store.api = api;
    this.store.__app = this.app;
  }
}

export default StoreModule;

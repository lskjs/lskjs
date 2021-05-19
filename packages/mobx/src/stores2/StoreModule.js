import Module from '@lskjs/module';
import importFn from '@lskjs/utils/importFn';

export class StoreModule extends Module {
  Store = null;
  store = null;
  async run() {
    await super.run();
    const Store = await importFn(this.Store);
    this.store = Store;
    const { Api } = this.store;
    const api = await Api.create({ app: this.app });
    this.store.api = api;
  }
}

export default StoreModule;

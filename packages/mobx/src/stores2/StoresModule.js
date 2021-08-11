// import Module from '@lskjs/module';
import { Module } from '@lskjs/module';
import mapValues from 'lodash/mapValues';

export class StoresModule extends Module {
  /**
   */
  // __stores?: IAsyncStoreKeyValue;

  /**
   * overridable
   */
  // stores?: IAsyncStoreKeyValue;

  /**
   * overridable
   */
  async getStores() {
    return {
      ...(this.stores || {}),
      ...(this.__stores || {}),
    };
  }

  setProp(key, value) {
    // @ts-ignore
    if (key === 'stores') return super.setProp('__stores', value);
    // @ts-ignore
    return super.setProp(key, value);
  }

  async moduleGetter(m) {
    // if (!m.dbName) throw '!this.dbName';
    // await m.app.module(m.dbName);
    // @ts-ignore
    return m.store;
  }

  async store(nameOrNames, ...args) {
    const storeModule = await this.module(nameOrNames, ...args);
    if (storeModule instanceof Module) {
      // @ts-ignore
      return storeModule.store;
    }
    // @ts-ignore
    return mapValues(storeModule, (m) => m.store);
  }

  async getModules() {
    const stores = await this.getStores();
    return {
      ...super.getModules(),
      ...mapValues(stores, (Store) => [() => import('./StoreModule'), { Store }]),
    };
  }
}

export default StoresModule;

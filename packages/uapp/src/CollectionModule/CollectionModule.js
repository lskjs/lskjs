import { Module } from '@lskjs/module';
import mapValues from 'lodash/mapValues';

import { IAsyncModel, IAsyncModelKeyValue } from './types';

export class ItemsModule extends Module {
  /**
   */
  __items;

  /**
   * overridable
   */
  items;

  /**
   * overridable
   */
  async getItems() {
    return {
      ...(this.items || {}),
      ...(this.__items || {}),
    };
  }

  setProp(key, value) {
    // @ts-ignore
    if (key === 'items') return super.setProp('__items', value);
    // @ts-ignore
    return super.setProp(key, value);
  }

  moduleGetter(m) {
    return m;
  }

  async getModules(): Promise<IAsyncModelKeyValue> {
    const items = await this.getModels();
    return {
      ...super.getModules(),
      ...mapValues(items, (Model: IAsyncModel) => [() => import('./ModelModule'), { Model }]),
    };
  }
}

export default ItemsModule;

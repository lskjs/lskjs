import { Module } from '@lskjs/module';
import mapValues from 'lodash/mapValues';

import { ItemModule } from './ItemModule';

export class ItemsModule extends Module {
  ItemModule = ItemModule;
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

  async getModules() {
    const items = await this.getIteem();
    return {
      ...super.getModules(),
      ...mapValues(items, (Item) => [this.ItemModule, { Item }]),
    };
  }
}

export default ItemsModule;

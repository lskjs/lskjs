import mapValues from 'lodash/mapValues';

import { Module } from '../Module';
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
    return m.item;
  }

  async getModules() {
    const items = await this.getItems();
    return {
      ...(await super.getModules()),
      ...mapValues(items, (item) => [this.ItemModule, { item }]),
    };
  }
}

export default ItemsModule;

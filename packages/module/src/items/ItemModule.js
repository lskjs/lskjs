import { Module } from '../Module';

export class ItemModule extends Module {
  setProp(key, value) {
    // @ts-ignore
    if (key === 'item') return super.setProp('__item', value);
    // @ts-ignore
    return super.setProp(key, value);
  }
  async createItem() {
    return this.__item;
  }
  async run() {
    // : Promise<void>
    await super.run();
    this.item = await this.createItem();
  }
}

export default ItemModule;

import { Module } from '../Module';

export class ItemModule extends Module {
  setProp(key, value) {
    // @ts-ignore
    if (key === 'item') return super.setProp('__item', value);
    // @ts-ignore
    return super.setProp(key, value);
  }
  async createItem() {
    // @ts-ignore
    return this.__item;
  }
  async run() {
    // : Promise<void>
    await super.run();
    // @ts-ignore
    this.item = await this.createItem();
  }
}

export default ItemModule;

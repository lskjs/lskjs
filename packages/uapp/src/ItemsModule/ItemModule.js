import Module from '@lskjs/module';

export class ItemModule extends Module {
  async createItem() {
    throw 'COLLECTION_ITEM_NOT_IMPLEMENTED';
  }
  async run() {
    // : Promise<void>
    await super.run();
    this.item = await this.createItem();
  }
}

export default ItemModule;

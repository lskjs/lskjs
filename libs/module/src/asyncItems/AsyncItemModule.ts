import { ItemModule } from '../items/ItemModule';
import { importFn } from '../utils/importFn';

export class AsyncItemModule extends ItemModule {
  async createItem() {
    // @ts-ignore
    return importFn(this.__item);
  }
}

export default AsyncItemModule;

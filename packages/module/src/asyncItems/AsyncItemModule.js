import importFn from '@lskjs/utils/importFn';

import { ItemModule } from '../items/ItemModule';

export class AsyncItemModule extends ItemModule {
  async createItem() {
    return importFn(this.__item);
  }
}

export default AsyncItemModule;

import { importFn } from '@lskjs/utils2';

import { ItemModule } from '../items/ItemModule';

export class AsyncItemModule extends ItemModule {
  async createItem() {
    // @ts-ignore
    return importFn(this.__item);
  }
}

export default AsyncItemModule;

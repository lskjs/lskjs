import { ItemsModule } from '@lskjs/module/items/ItemsModule';

import { AsyncItemModule } from './AsyncItemModule';

export class AsyncItemsModule extends ItemsModule {
  ItemModule = AsyncItemModule;
  // async init() {
  //   await super.init();
  //   console.log('AsyncItemsModule.this', this);
  // }
}

export default AsyncItemsModule;

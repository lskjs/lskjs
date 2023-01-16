import { ItemModule } from '../items/ItemModule';
import { createAsyncModule } from '../utils/createAsyncModule';

export class AsyncItemModule extends ItemModule {
  async createItem() {
    // @ts-ignore
    return createAsyncModule(this.__item, {
      __parent: this.__parent,
      app: this.app,
      config: this.config,
    });
  }
}

export default AsyncItemModule;

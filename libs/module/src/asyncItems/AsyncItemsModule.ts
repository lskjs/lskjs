import { ItemsModule } from '../items/ItemsModule';
import { AsyncItemModule } from './AsyncItemModule';

export class AsyncItemsModule extends ItemsModule {
  ItemModule = AsyncItemModule;
}

export default AsyncItemsModule;

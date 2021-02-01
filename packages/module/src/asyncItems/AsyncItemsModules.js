import { Module } from '../Module';
import { AsyncItemModule } from './AsyncItemModule';

export class AsyncItemsModule extends ItemsModule {
  ItemModule = AsyncItemModule;
}

export default AsyncItemsModule;

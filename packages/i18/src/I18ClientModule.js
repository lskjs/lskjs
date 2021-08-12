import { I18Module } from './I18Module';
import { I18MobxInstance } from './instances/I18MobxInstance';

export class I18ClientModule extends I18Module {
  I18Instance = I18MobxInstance;
}

export default I18ClientModule;

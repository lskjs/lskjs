import createEventEmitter from './utils/createEventEmitter';
import { IModuleWithEE, IEventEmitter } from './types';
import { ModuleWithLog } from './ModuleWithLog';

export abstract class ModuleWithEE extends ModuleWithLog implements IModuleWithEE {
  ee?: IEventEmitter;

  createEe(): IEventEmitter {
    return createEventEmitter() as IEventEmitter;
  }

  on(event: string, callback: (event: string, ...args: any[]) => void): void {
    if (!this.ee) this.ee = this.createEe();
    this.ee.on(event, callback);
  }

  emit(event: string, ...args: any[]): void {
    if (!this.ee) this.ee = this.createEe();
    this.ee.emit(event, ...args);
  }
}

export default ModuleWithEE;

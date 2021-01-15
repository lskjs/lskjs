import createEventEmitter from './utils/createEventEmitter';
import { IModuleWithEE, IEventEmitter } from './types';
import { ModuleWithLog } from './ModuleWithLog';

export abstract class ModuleWithEE extends ModuleWithLog implements IModuleWithEE {
  ee?: IEventEmitter;

  createEe(): IEventEmitter {
    return createEventEmitter() as IEventEmitter;
  }

  on(event: string, callback: (event: string, ...args: any[]) => void): void {
    if (this.debug) this.log.trace('[ee]', `on(${event}) [subscribed]`);
    if (!this.ee) this.ee = this.createEe();
    this.ee.on(event, async (...args) => {
      try {
        if (this.debug) this.log.trace('[ee]', `on(${event}) <==`);
        await callback(...args);
      } catch (err) {
        this.log.error('[ee]', `on(${event}) <==`, err);
      }
    });
  }

  emit(event: string, ...args: any[]): void {
    if (this.debug) this.log.trace('[ee]', `emit(${event}) ==>`);
    if (!this.ee) this.ee = this.createEe();
    this.ee.emit(event, ...args);
  }

  async init(): Promise<void> {
    await super.init();
    if (this.config?.ee) this.ee = this.createEe();
    if (this.ee) this.emit('init');
  }

  async __lifecycleEvent(name: string, value = new Date()): Promise<void> {
    await super.__lifecycleEvent(name, value);
    if (this.ee) this.emit(name);
  }
}

export default ModuleWithEE;

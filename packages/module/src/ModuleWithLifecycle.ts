import set from 'lodash/set';
import Err from '@lskjs/utils/Err';
import { IModuleLifecycle, IModuleWithLifecycle, IModuleConstructor, IModuleProps, IModule } from './types';

// @ts-ignore
const STRICT_DEBUG = __DEV__;

const safeLog = (ctx: any, level = 'error', ...args: any[]) => {
  if (ctx.log && ctx.log[level]) {
    ctx.log[level](...args);
  } else {
    console.error(`[${level[0]}] <${ctx.name || ctx.constructor.name}>`, ...args); // eslint-disable-line no-console
  }
};

export abstract class ModuleWithLifecycle implements IModuleWithLifecycle {
  name: string;
  __lifecycle: IModuleLifecycle = {};

  static async create<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T> {
    const instance = new this();
    instance.setProps(...propsArray, { '__lifecycle.create': new Date() });
    await instance.__init();
    return instance;
  }

  static async createAndRun<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T> {
    const instance = await this.create(...propsArray);
    await instance.__run();
    return instance;
  }

  setProp(key: string, value: any): void {
    set(this, key, value);
  }

  setProps(...propsArray: IModuleProps[]): void {
    propsArray.forEach((props) => {
      Object.keys(props).forEach((key) => {
        this.setProp(key, props[key]);
      });
    });
  }

  async __lifecycleEvent(name: string, value = new Date()): Promise<void> {
    this.__lifecycle[name] = value;
  }

  async __init(): Promise<void> {
    const { name } = this.constructor;
    if (!this.__lifecycle.create) {
      throw new Err(
        'MODULE_INVALID_LIVECYCLE_NEW',
        `use ${name}.create(props) or ${name}.createAndRun(props) instead new ${name}(props) and init() and run()`,
        { data: { name } },
      );
    }
    if (this.__lifecycle.initStart) return;
    this.__lifecycleEvent('initStart');
    await this.init().catch((err) => {
      safeLog(this, 'fatal', 'init()', err);
      throw err;
    });
    this.__lifecycleEvent('initFinish');
  }

  async init(): Promise<void> {
    const { name } = this.constructor;
    if (!this.__lifecycle.create) {
      throw new Err('MODULE_INVALID_LIVECYCLE_NEW', `use ${name}.create(props) instead new ${name}(props)`, {
        data: { name },
      });
    }
    if (!this.__lifecycle.initStart) {
      throw new Err('MODULE_INVALID_LIVECYCLE_INIT', `use ${name}.__init() instead ${name}.init()`, { data: { name } });
    }
    this.name = name;
  }

  async __run(): Promise<void> {
    if (this.__lifecycle.runStart && this.__lifecycle.stopFinish) {
      delete this.__lifecycle.stopStart;
      delete this.__lifecycle.stopFinish;
      delete this.__lifecycle.runStart;
      delete this.__lifecycle.runFinish;
    }
    if (this.__lifecycle.runStart) {
      if (STRICT_DEBUG) throw new Err('MODULE_HAS_BEEN_RUNNED', { data: { name: this.name } });
      return;
    }
    if (!this.__lifecycle.initStart) await this.__init();
    if (!this.__lifecycle.initFinish) {
      throw new Err('MODULE_INVALID_LIVECYCLE_INIT_WAIT', 'please waiting for init() finish before run()', {
        data: { name: this.name },
      });
    }
    this.__lifecycleEvent('runStart');
    await this.run().catch((err) => {
      safeLog(this, 'fatal', 'run()', err);
      throw err;
    });
    this.__lifecycleEvent('runFinish');
  }

  async run(): Promise<void> {
    if (!this.__lifecycle.runStart)
      throw new Err('MODULE_INVALID_LIVECYCLE_RUN', 'use module.__run() instead module.run()', {
        data: { name: this.name },
      });
  }

  async __stop(): Promise<void> {
    if (this.__lifecycle.stopStart) {
      if (STRICT_DEBUG) throw new Err('MODULE_HAS_BEEN_STOPED_BEFORE');
      return;
    }
    if (!this.__lifecycle.runFinish) {
      if (STRICT_DEBUG) throw new Err('MODULE_NOT_RUNNED_YET');
      return;
    }
    this.__lifecycleEvent('stopStart');
    await this.stop().catch((err) => {
      safeLog(this, 'fatal', 'stop()', err);
      throw err;
    });
    this.__lifecycleEvent('stopFinish');
  }

  async stop(): Promise<void> {
    if (!this.__lifecycle.stopStart)
      throw new Err('MODULE_INVALID_LIVECYCLE_STOP', 'use module.__stop() instead module.stop()', {
        data: { name: this.name },
      });
  }
}

export default ModuleWithLifecycle;

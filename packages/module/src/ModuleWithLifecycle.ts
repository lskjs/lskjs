import Err from '@lskjs/utils/Err';
import set from 'lodash/set';

import { IModule, IModuleConstructor, IModuleLifecycle, IModuleProps, IModuleWithLifecycle } from './types';

// @ts-ignore
const STRICT_DEBUG =
  typeof window !== 'undefined' ? window.__DEV__ : typeof process !== 'undefined' ? process.__DEV__ : false; // eslint-disable-line no-nested-ternary

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

  static new<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): T {
    const instance = new this();
    instance.setProps(...propsArray, { '__lifecycle.create': new Date() });
    return instance;
  }

  static async create<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T> {
    const instance = new this();
    instance.setProps(...propsArray, { '__lifecycle.create': new Date() });
    if (instance.__init) {
      await instance.__init();
    } else if (instance.init) {
      await instance.init();
    }
    return instance;
  }

  static async createAndRun<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T> {
    return this.start(...propsArray);
  }

  static async start<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T> {
    const instance = await this.create(...propsArray);
    if (instance.start) {
      await instance.start();
    } else if (instance.__run) {
      await instance.__run();
    } else if (instance.run) {
      await instance.run();
    }
    return instance;
  }

  setProp(key: string, value: any): void {
    if (key === 'autorun') {
      set(this, '__lifecycle.autorun', value);
      return;
    }
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

  async onInit(): Promise<void> {}
  async __init(): Promise<void> {
    const { name } = this.constructor;
    if (!this.__lifecycle.create) {
      throw new Err(
        'MODULE_INVALID_LIVECYCLE_NEW',
        `use ${name}.create(props) or ${name}.start(props) instead new ${name}(props) and init() and run()`,
        { data: { name } },
      );
    }
    if (this.__lifecycle.initStart) return;
    this.__lifecycleEvent('initStart');
    try {
      await this.init();
    } catch (err) {
      safeLog(this, 'fatal', 'init()', err);
      throw err;
    }
    this.__lifecycleEvent('initFinish');
    if (this.onInit) {
      try {
        await this.onInit();
      } catch (err) {
        safeLog(this, 'fatal', 'onInit()', err);
        throw err;
      }
    }
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

  async start(): Promise<void> {
    await this.__run();
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
    try {
      await this.run();
    } catch (err) {
      safeLog(this, 'fatal', 'run()', err);
      throw err;
    }
    this.__lifecycleEvent('runFinish');
  }

  async run(): Promise<void> {
    if (!this.__lifecycle.runStart) {
      throw new Err('MODULE_INVALID_LIVECYCLE_RUN', 'use module.__run() instead module.run()', {
        data: { name: this.name },
      });
    }
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
    try {
      await this.stop();
    } catch (err) {
      safeLog(this, 'fatal', 'stop()', err);
      throw err;
    }
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

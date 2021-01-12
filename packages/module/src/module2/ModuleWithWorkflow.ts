import set from 'lodash/set';
import Err from '@lskjs/utils/Err';
import { IWorkflow, IModuleWithWorkflow, IModuleConstructor, IModuleProps, IModule } from './types';

// @ts-ignore
const STRICT_DEBUG = __DEV__;

const safeLog = (ctx: any, level = 'error', ...args: any[]) => {
  if (ctx.log && ctx.log[level]) {
    ctx.log[level](...args);
  } else {
    console.error(`[${level[0]}] <${ctx.name || ctx.constructor.name}>`, ...args); // eslint-disable-line no-console
  }
};

export abstract class ModuleWithWorkflow implements IModuleWithWorkflow {
  name: string;
  __workflow: IWorkflow = {};

  static async create<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T> {
    const instance = new this();
    instance.setProps(...propsArray, { '__workflow.createdAt': new Date() });
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

  async __workflowEvent(name: string, value = new Date()): Promise<void> {
    this.__workflow[name] = value;
  }

  async __init(): Promise<void> {
    const { name } = this.constructor;
    if (!this.__workflow.createdAt) {
      throw new Err(
        'MODULE_INVALID_WORKFLOW_NEW',
        `use ${name}.create(props) or ${name}.createAndRun(props) instead new ${name}(props) and init() and run()`,
        { data: { name } },
      );
    }
    if (this.__workflow.initAt) return;
    this.__workflowEvent('initAt');
    await this.init().catch((err) => {
      safeLog(this, 'fatal', 'init()', err);
      throw err;
    });
    this.__workflowEvent('initFinishedAt');
  }

  async init(): Promise<void> {
    const { name } = this.constructor;
    if (!this.__workflow.createdAt) {
      throw new Err('MODULE_INVALID_WORKFLOW_NEW', `use ${name}.create(props) instead new ${name}(props)`, {
        data: { name },
      });
    }
    if (!this.__workflow.initAt) {
      throw new Err('MODULE_INVALID_WORKFLOW_INIT', `use ${name}.__init() instead ${name}.init()`, { data: { name } });
    }
    this.name = name;
  }

  async __run(): Promise<void> {
    if (this.__workflow.runAt && this.__workflow.stopFinishedAt) {
      delete this.__workflow.stopAt;
      delete this.__workflow.stopFinishedAt;
      delete this.__workflow.runAt;
      delete this.__workflow.runFinishedAt;
    }
    if (this.__workflow.runAt) {
      if (STRICT_DEBUG) throw new Err('MODULE_HAS_BEEN_RUNNED', { data: { name: this.name } });
      return;
    }
    if (!this.__workflow.initAt) await this.__init();
    if (!this.__workflow.initFinishedAt) {
      throw new Err('MODULE_INVALID_WORKFLOW_INIT_WAIT', 'please waiting for init() finish before run()', {
        data: { name: this.name },
      });
    }
    this.__workflowEvent('runAt');
    await this.run().catch((err) => {
      safeLog(this, 'fatal', 'run()', err);
      throw err;
    });
    this.__workflowEvent('runFinishedAt');
  }

  async run(): Promise<void> {
    if (!this.__workflow.runAt)
      throw new Err('MODULE_INVALID_WORKFLOW_RUN', 'use module.__run() instead module.run()', {
        data: { name: this.name },
      });
  }

  async __stop(): Promise<void> {
    if (this.__workflow.stopAt) {
      if (STRICT_DEBUG) throw new Err('MODULE_HAS_BEEN_STOPED_BEFORE');
      return;
    }
    if (!this.__workflow.runFinishedAt) {
      if (STRICT_DEBUG) throw new Err('MODULE_NOT_RUNNED_YET');
      return;
    }
    this.__workflowEvent('stopAt');
    await this.stop().catch((err) => {
      safeLog(this, 'fatal', 'stop()', err);
      throw err;
    });
    this.__workflowEvent('stopFinishedAt');
  }

  async stop(): Promise<void> {
    if (!this.__workflow.stopAt)
      throw new Err('MODULE_INVALID_WORKFLOW_STOP', 'use module.__stop() instead module.stop()', {
        data: { name: this.name },
      });
  }
}

export default ModuleWithWorkflow;

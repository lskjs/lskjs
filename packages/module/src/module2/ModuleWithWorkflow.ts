import assignProps from '@lskjs/utils/assignProps';
import Err from '@lskjs/utils/Err';
import { IModuleWithWorkflow, IModuleConstructor, IModulePropsArray, IModule } from './types';

export abstract class ModuleWithWorkflow implements IModuleWithWorkflow {
  name: string;
  __createdAt: Date;
  __initAt: Date;
  __runAt: Date;

  static async create<T extends IModule>(this: IModuleConstructor<T>, ...props: IModulePropsArray): Promise<T> {
    const instance = new this();
    instance.assignProps(...props);
    instance.__createdAt = new Date();
    await instance.init();
    return instance;
  }

  static async createAndRun<T extends IModule>(this: IModuleConstructor<T>, ...props: IModulePropsArray): Promise<T> {
    const instance = await this.create(...props);
    await instance.run();
    return instance;
  }

  assignProps(...props: IModulePropsArray): void {
    assignProps(this, ...props);
  }

  async init(): Promise<void> {
    if (!this.__createdAt) {
      throw new Err('MODULE_INVALID_NEW', 'use Module.create(props) instead new Module(props)');
    }
    if (this.__initAt) return;
    this.__initAt = new Date();
    this.name = this.constructor.name;
  }

  async run(): Promise<void> {
    if (this.__runAt) return;
    if (!this.__initAt) await this.init();
    this.__runAt = new Date();
  }

  async stop(): Promise<void> {
    if (!this.__runAt) return;
  }
}

export default ModuleWithWorkflow;

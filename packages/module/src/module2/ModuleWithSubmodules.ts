/* eslint-disable @typescript-eslint/interface-name-prefix */
import arrayToObject from '@lskjs/utils/arrayToObject';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Err from '@lskjs/utils/Err';
import { ModuleWithEE } from './ModuleWithEE';
import { createAsyncModule } from './utils/createAsyncModule';
import { IModule, IModuleWithSubmodules, IModuleKeyValue, IAsyncModule, IAsyncModuleKeyValue } from './types';

export abstract class ModuleWithSubmodules extends ModuleWithEE implements IModuleWithSubmodules {
  __availableModules: IAsyncModuleKeyValue = {};
  __initedModules: IModuleKeyValue = {};
  async __getModules(): Promise<IAsyncModuleKeyValue> {
    const modules = await this.getModules();
    return {
      ...modules,
      ...(this.modules || {}),
    };
  }

  parent?: IModule;
  modules?: IAsyncModuleKeyValue;

  getModules(): IAsyncModuleKeyValue {
    return {};
  }

  async module(nameOrNames: string | string[], { run: isRun = false } = {}): Promise<IModule | IModuleKeyValue> {
    if (!this.__initAt) throw new Err('MODULE_NOT_INITED');
    if (Array.isArray(nameOrNames)) return asyncMapValues(arrayToObject(nameOrNames), (n: string) => this.module(n) as Promise<IModule>);
    const name = nameOrNames;
    if (this.__initedModules[name]) return this.__initedModules[name];
    if (!this.__availableModules || !this.__availableModules[name]) throw new Err('MODULE_INJECT_MISSING', { data: { name } });
    try {
      const instance = await createAsyncModule(this.__availableModules[name]);
      if (isRun) await instance.run();
      this.__initedModules[name] = instance;
      return instance;
    } catch (err) {
      this.log.error(`module(${name})`, err);
      throw new Err('MODULE_INJECT_ERROR', { data: { name } }, err);
    }
  }

  async init(): Promise<void> {
    await super.init();
    await this.__initModules();
  }

  private async __initModules(): Promise<void> {
    this.__availableModules = await this.__getModules();
    if (this.debug && this.log) this.log.debug('availableModules', Object.keys(this.__availableModules));
  }

  private async __runModules(): Promise<void> {
    await asyncMapValues(this.__initedModules, (m: IModule) => m.run());
  }

  async run(): Promise<void> {
    await super.run();
    await this.__runModules();
  }
}

export default ModuleWithSubmodules;

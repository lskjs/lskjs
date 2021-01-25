/* eslint-disable @typescript-eslint/interface-name-prefix */
import arrayToObject from '@lskjs/utils/arrayToObject';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Err from '@lskjs/utils/Err';
import { IAsyncModule } from 'IModule.types';
import get from 'lodash/get';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';

// import { setProps } from './utils/setProps';
import { ModuleWithEE } from './ModuleWithEE';
import { IAsyncModuleKeyValue, IModule, IModuleKeyValue, IModuleWithSubmodules } from './types';
import { createAsyncModule } from './utils/createAsyncModule';

const filterWildcard = (array: string[], pattern: string): string[] =>
  array.filter((name) => name.startsWith(pattern.substr(0, pattern.length - 1)));

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

  __parent?: IModule;
  modules?: IAsyncModuleKeyValue;

  getModules(): IAsyncModuleKeyValue {
    return {};
  }

  // app.webserver.i18
  // app.webserver.i18:I18Module

  async getModuleConfig(name: string): Promise<Record<string, unknown>> {
    const config = get(this.config, name, {});
    // const name = this.debug
    const ns = [this.log.ns, name].filter(Boolean).join('.');
    // const ns = [this.log.ns, name].filter(Boolean).join('.');
    return {
      debug: this.config.debug,
      ...config,
      log: {
        ...omit(this.config.log || {}, ['name']),
        ns,
        ...(config.log || {}),
      },
    };
  }

  async getModuleProps(name: string): Promise<Record<string, unknown>> {
    return {
      // app: this.app || this,
      __parent: this,
      config: await this.getModuleConfig(name),
    };
  }

  hasModule(nameOrNames: string | string[]): boolean | { [name: string]: boolean } {
    if (typeof nameOrNames === 'string' && nameOrNames.endsWith('*')) {
      // eslint-disable-next-line no-param-reassign
      nameOrNames = filterWildcard(Object.keys(this.__availableModules), nameOrNames);
    }
    if (Array.isArray(nameOrNames)) {
      return mapValues(arrayToObject(nameOrNames), (n: string) => this.hasModule(n) as boolean);
    }
    const name = nameOrNames;
    return Boolean(this.__availableModules[name]);
  }

  async module(
    nameOrNames: string | string[],
    { run: isRun = true, throw: throwIfNotFound = true } = {},
  ): Promise<IModule | IModuleKeyValue | null> {
    if (!this.__lifecycle.initStart)
      throw new Err('MODULE_INVALID_WORKFLOW_INIT', 'please init module first before .module()');
    if (typeof nameOrNames === 'string' && nameOrNames.endsWith('*')) {
      const names = filterWildcard(Object.keys(this.__availableModules), nameOrNames);
      this.log.trace(`module(${nameOrNames})`, names);
      // eslint-disable-next-line no-param-reassign
      nameOrNames = names;
    }
    if (Array.isArray(nameOrNames)) {
      return asyncMapValues(arrayToObject(nameOrNames), (n: string) => this.module(n) as Promise<IModule>);
    }
    const name = nameOrNames;
    if (this.debug) this.log.trace(`module(${name})`, isRun ? 'run' : undefined);
    if (this.__initedModules[name]) return this.__initedModules[name];
    const availableModule = this.__availableModules && this.__availableModules[name];
    if (!availableModule) {
      if (!throwIfNotFound) return null;
      throw new Err('MODULE_INJECTING_NOT_FOUND', `Module "${name}" not found in module ${this.name}`, {
        data: { name },
      });
    }
    try {
      const moduleProps = await this.getModuleProps(name);
      const instance = await createAsyncModule(availableModule, moduleProps);
      this.__initedModules[name] = instance;
      if (isRun) {
        if (instance.start) {
          await instance.start();
        } else if (instance.__run) {
          await instance.__run();
        } else if (instance.run) {
          await instance.run();
        }
      }
      return instance;
    } catch (err) {
      this.log.fatal(`module(${name})`, err);
      throw new Err('MODULE_INJECTING_ERROR', { data: { name } }, err);
    }
  }

  async init(): Promise<void> {
    await super.init();
    await this.__initModules();
  }

  private async __initModules(): Promise<void> {
    this.__availableModules = await this.__getModules();
    if (this.debug && this.log && Object.keys(this.__availableModules).length) {
      this.log.debug('modules', Object.keys(this.__availableModules));
    }
    const autorunModules = map(this.__availableModules, (asyncModule: IAsyncModule, name: string): string | null => {
      // eslint-disable-next-line no-param-reassign
      if (!Array.isArray(asyncModule)) asyncModule = [asyncModule];
      let autorun = false;
      asyncModule.forEach((props: any) => {
        if (props && props.autorun) autorun = true;
      });
      if (autorun) return name;
      return null;
    }).filter(Boolean) as string[];

    if (autorunModules && autorunModules.length) {
      this.log.debug('modules autorun', autorunModules);
      await this.module(autorunModules);
    }
  }

  private async __runModules(): Promise<void> {
    await asyncMapValues(this.__initedModules, (m: IModule) => {
      let isNeedRun;
      if (!this.__lifecycle.initFinish) {
        isNeedRun = !!this.__lifecycle.autorun;
      } else {
        isNeedRun = !this.__lifecycle.runStart || (this.__lifecycle.runStart && this.__lifecycle.stopFinish);
      }
      if (!isNeedRun) return;
      return m.start();
    });
  }

  async run(): Promise<void> {
    await super.run();
    await this.__runModules();
  }
}

export default ModuleWithSubmodules;

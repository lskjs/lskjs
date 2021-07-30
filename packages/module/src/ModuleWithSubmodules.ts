import Err from '@lskjs/err';
import Mutex from '@lskjs/mutex';
import arrayToObject from '@lskjs/utils/arrayToObject';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import get from 'lodash/get';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';

import { IAsyncModule } from './IModule.types';
// import { setProps } from './utils/setProps';
import { ModuleWithEE } from './ModuleWithEE';
import { IAsyncModuleKeyValue, IModule, IModuleKeyValue, IModuleWithSubmodules } from './types';
import { createAsyncModule } from './utils/createAsyncModule';
import { filterWildcard } from './utils/filterWildcard';

const mutexMap = {};
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

  async moduleGetter(m: IModule): Promise<any> {
    return m;
  }

  async module(
    nameOrNames: string | string[],
    { run: isRun = true, throw: throwIfNotFound = true, getter = undefined } = {},
  ): Promise<IModule | IModuleKeyValue | null> {
    if (!this.__lifecycle.initStart) {
      throw new Err('MODULE_INVALID_WORKFLOW_INIT', 'please init module first before .module()');
    }
    if (typeof nameOrNames === 'string' && !nameOrNames.includes('.') && nameOrNames.endsWith('*')) {
      const names = filterWildcard(Object.keys(this.__availableModules), nameOrNames);
      this.log.trace(`module(${nameOrNames})`, names);
      // eslint-disable-next-line no-param-reassign
      nameOrNames = names;
    }
    if (Array.isArray(nameOrNames)) {
      return asyncMapValues(arrayToObject(nameOrNames), (n: string) => this.module(n) as Promise<IModule>);
    }
    let name;
    let postfix;
    if (nameOrNames.includes('.')) {
      const [prefix, ...postfixArray] = nameOrNames.split('.');
      name = prefix;
      if (postfixArray.length) {
        postfix = postfixArray.join('.');
      }
    } else {
      name = nameOrNames;
    }
    // eslint-disable-next-line no-nested-ternary
    const debugInfo = this.__initedModules[name] ? '[cache]' : isRun ? '[run]' : undefined;
    const mutexKey = `${this.name}/${name}`;
    let mutexRelease;
    // console.log({ mutexKey });
    if (!this.__initedModules[name]) {
      if (!mutexMap[mutexKey]) {
        // console.log('new Mutex()');
        mutexMap[mutexKey] = new Mutex();
      }
      const mutex = mutexMap[mutexKey];

      if (await mutex.isAsyncLocked(5000, 1)) {
        throw new Err(
          'MODULE_LONG_PARALLEL_INIT',
          'Вы пытаетесь параллельно инициализировать один и тот же модуль и за секунду он не успевает заинититься',
        );
      } else {
        mutexRelease = await mutex.acquire();
      }
    }

    if (this.__initedModules[name]) {
      if (mutexRelease) mutexRelease();
      delete mutexMap[mutexKey];
      const instance = this.__initedModules[name]!;
      if (postfix) return instance.module(postfix, { run: isRun, throw: throwIfNotFound, getter });
      // @ts-ignore
      if (getter) return getter(instance);
      return this.moduleGetter(instance);
    }

    if (this.debug) this.log.trace(`debugInfo! module(${name})`, debugInfo);
    const availableModule = this.__availableModules && this.__availableModules[name];
    if (!availableModule) {
      if (!throwIfNotFound) return null;
      throw new Err('MODULE_INJECT_NOT_FOUND', `Module "${name}" not found in module ${this.name}`, {
        data: { name },
      });
    }
    try {
      const moduleProps = await this.getModuleProps(name);
      const instance = await createAsyncModule(availableModule, moduleProps);
      if (isRun) {
        try {
          if (instance.start) {
            await instance.start();
          } else if (instance.__run) {
            await instance.__run();
          } else if (instance.run) {
            await instance.run();
          }
        } catch (err) {
          if (instance.__stop) {
            await instance.__stop();
          } else if (instance.stop) {
            await instance.stop();
          }
          throw err;
        }
      }
      this.__initedModules[name] = instance; // TODO: хороший вопрос, стоитл ли сохранять инстанс в кеше даже если run прошел неудачно
      if (postfix) return instance.module(postfix, { run: isRun, throw: throwIfNotFound, getter });
      // @ts-ignore
      if (getter) return getter(instance);
      return await this.moduleGetter(instance);
    } catch (err) {
      this.log.fatal(`module(${name})`, err);
      throw new Err('MODULE_INJECT_ERROR', { data: { name } }, err);
    } finally {
      if (mutexRelease) mutexRelease();
      delete mutexMap[mutexKey];
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
    await asyncMapValues(this.__initedModules, async (m: IModule) => {
      let isNeedRun;
      if (!this.__lifecycle.initFinish) {
        isNeedRun = !!this.__lifecycle.autorun;
      } else {
        isNeedRun = !this.__lifecycle.runStart || (this.__lifecycle.runStart && this.__lifecycle.stopFinish);
      }
      if (!isNeedRun) return;
      await m.start();
    });
  }

  async run(): Promise<void> {
    await super.run();
    await this.__runModules();
  }
}

export default ModuleWithSubmodules;

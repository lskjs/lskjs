/* eslint-disable no-return-await */
import { map, mapValues, omit } from '@lskjs/algos';
import { getEnvVar, isDev } from '@lskjs/env';
import { Err } from '@lskjs/err';
import { Mutex } from '@lskjs/mutex';
import { props } from 'fishbird';

import { IAsyncModule } from './IModule.types';
// import { setProps } from './utils/setProps';
import { ModuleWithEE } from './ModuleWithEE';
import { IAsyncModuleKeyValue, IModule, IModuleKeyValue, IModuleWithSubmodules } from './types';
import { arrayToObject } from './utils/arrayToObject';
import { createAsyncModule } from './utils/createAsyncModule';
import { filterWildcard } from './utils/filterWildcard';

// TODO: подумать как сделать не вложенный экспорт
// const models = await this.app.module(['models.BillingPaymentMethod', 'models.BillingCompany']);

const MODULE_MUTEX_GLOBAL = !!getEnvVar('LSK_MODULE_MUTEX_GLOBAL', 0); // TODO: подумать над неймингом
const MODULE_MUTEX_INTERVAL = +getEnvVar('LSK_MODULE_MUTEX_INTERVAL', 1);
const MODULE_MUTEX_TIME = +getEnvVar('LSK_MODULE_MUTEX_TIME', isDev ? 1000 : 10000);
const MODULE_MUTEX_RUN_TIME = +getEnvVar('LSK_MODULE_MUTEX_RUN_TIME', isDev ? 4000 : 0);

const globalMutexMap = {};
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
  mutexMap = MODULE_MUTEX_GLOBAL ? globalMutexMap : {};

  getModules(): IAsyncModuleKeyValue {
    return {};
  }

  // app.webserver.i18
  // app.webserver.i18:I18Module

  async getModuleConfig(name: string): Promise<Record<string, unknown>> {
    const config = this.config?.[name] || {};
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

  // TODO: добавить метод какоторый получает статус подмодуля

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
    if (
      typeof nameOrNames === 'string' &&
      !nameOrNames.includes('.') &&
      nameOrNames.endsWith('*')
    ) {
      const names = filterWildcard(Object.keys(this.__availableModules), nameOrNames);
      this.log.trace(`module(${nameOrNames})`, names);
      // eslint-disable-next-line no-param-reassign
      nameOrNames = names;
    }
    if (Array.isArray(nameOrNames)) {
      // @ts-ignore
      return props(arrayToObject(nameOrNames), (n: string) => this.module(n) as Promise<IModule>);
    }
    // console.log(551111);
    let name;
    let postfix: any;
    if (nameOrNames.includes('.')) {
      const [prefix, ...postfixArray] = nameOrNames.split('.');
      name = prefix;
      if (postfixArray.length) {
        postfix = postfixArray.join('.');
      }
    } else {
      name = nameOrNames;
    }
    // console.log(552222);

    // eslint-disable-next-line no-nested-ternary
    const debugInfo = this.__initedModules[name] ? '[cache]' : isRun ? '[run]' : undefined;
    const mutexKey = name;
    let mutexRelease;
    // console.log({ name: this.name, mutexKey }, this.mutexMap);
    if (!this.__initedModules[name]) {
      // console.log('mutex', this.__initedModules[name], this.mutexMap[mutexKey]);
      if (!this.mutexMap[mutexKey]) {
        // console.log('new Mutex()', { name: this.name, mutexKey }, this.mutexMap);
        this.mutexMap[mutexKey] = new Mutex();
      }
      const mutex = this.mutexMap[mutexKey];
      const mutexTime = (isRun ? MODULE_MUTEX_RUN_TIME : MODULE_MUTEX_TIME) || 60 * 1000; // TODO: 1 мин - заместо бесконечности

      if (await mutex.isAsyncLocked(mutexTime, MODULE_MUTEX_INTERVAL)) {
        throw new Err(
          'MODULE_LONG_PARALLEL_INIT',
          // 'Вы пытаетесь параллельно инициализировать один и тот же модуль и за секунду он не успевает заинититься',
          {
            data: {
              name: this.name,
              module: nameOrNames,
              mutexTime,
              isRun,
            },
          },
        );
      } else {
        mutexRelease = await mutex.acquire();
      }
    }

    if (this.__initedModules[name]) {
      if (mutexRelease) mutexRelease();
      delete this.mutexMap[mutexKey];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const instance = this.__initedModules[name]!;
      if (postfix) {
        return instance
          .module(postfix, { run: isRun, throw: throwIfNotFound, getter })
          .catch((err) => {
            throw err;
            // TODO: подумать о том, как передавать вложенные ошибки
            // throw new Err('MODULE_INJECT_ERROR', {
            //   data: {
            //     name: this.name,
            //     module: postfix,
            //     code: Err.getCode(err),
            //     message: Err.getMessage(err),
            //     data: err && err.data ? err.data : null,
            //   },
            //   err,
            // });
          });
      }
      // @ts-ignore
      if (getter) return await getter(instance);
      return this.moduleGetter(instance);
    }

    if (this.debug) this.log.trace(`debugInfo! module(${name})`, debugInfo);
    const availableModule = this.__availableModules && this.__availableModules[name];
    if (!availableModule) {
      if (mutexRelease) mutexRelease();
      delete this.mutexMap[mutexKey];
      if (!throwIfNotFound) return null;
      throw new Err(
        'MODULE_INJECT_NOT_FOUND',
        `Module "${name}" not found in module ${this.name}`,
        {
          data: { name: this.name, module: name },
        },
      );
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
      if (postfix)
        return instance.module(postfix, {
          run: isRun,
          throw: throwIfNotFound,
          getter,
        });
      // @ts-ignore
      if (getter) return await getter(instance);
      return await this.moduleGetter(instance);
    } catch (err) {
      this.log.fatal(`module(${name})`, err);
      throw new Err('MODULE_INJECT_ERROR', {
        data: {
          name: this.name,
          module: name,
          code: Err.getCode(err),
          message: Err.getMessage(err),
        },
        err,
      });
    } finally {
      if (mutexRelease) mutexRelease();
      // console.log('delete mutexMap', { name: this.name, mutexKey }, this.mutexMap); //
      delete this.mutexMap[mutexKey];
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
    const autorunModules = map(
      this.__availableModules,
      (asyncModule: IAsyncModule, name: string): string | null => {
        // eslint-disable-next-line no-param-reassign
        if (!Array.isArray(asyncModule)) asyncModule = [asyncModule];
        let autorun = false;
        asyncModule.forEach((props2: any) => {
          if (props2 && props2.autorun) autorun = true;
        });
        if (autorun) return name;
        return null;
      },
    ).filter(Boolean) as string[];

    if (autorunModules && autorunModules.length) {
      this.log.debug('modules autorun', autorunModules);
      await this.module(autorunModules);
    }
  }

  private async __runModules(): Promise<void> {
    await props(this.__initedModules, async (m: IModule) => {
      let isNeedRun;
      if (!this.__lifecycle.initFinish) {
        isNeedRun = !!this.__lifecycle.autorun;
      } else {
        isNeedRun =
          !this.__lifecycle.runStart || (this.__lifecycle.runStart && this.__lifecycle.stopFinish);
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

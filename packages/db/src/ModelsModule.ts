// import Module from '@lskjs/module';
import { IModule, Module } from '@lskjs/module';
import mapValues from 'lodash/mapValues';

import { IAsyncModel, IAsyncModelKeyValue, IModel, IModelKeyValue, IModelsModule } from './types';

export class ModelsModule extends Module implements IModelsModule {
  /**
   */
  __models?: IAsyncModelKeyValue;

  /**
   * overridable
   */
  models?: IAsyncModelKeyValue;

  /**
   * overridable
   */
  async getModels(): Promise<IAsyncModelKeyValue> {
    return {
      ...(this.models || {}),
      ...(this.__models || {}),
    };
  }

  setProp(key: string, value: any): Promise<void> {
    // @ts-ignore
    if (key === 'models') return super.setProp('__models', value);
    // @ts-ignore
    return super.setProp(key, value);
  }

  async moduleGetter(m: IModule): Promise<any> {
    if (!m.dbName) throw '!this.dbName';
    await m.app.module(m.dbName, { run: true });
    // @ts-ignore
    return m.model;
  }

  async model(nameOrNames: string | string[], ...args: any[]): Promise<IModel | IModelKeyValue> {
    const options = { run: true, ...(args[0] || {}) };
    const modelModule = await this.module(nameOrNames, options);
    if (modelModule instanceof Module) {
      // @ts-ignore
      return modelModule.model;
    }
    // @ts-ignore
    if (Array.isArray(nameOrNames)) {
      return mapValues(modelModule, (m) => m.model);
    }
    return modelModule;
  }

  async getModules(): Promise<IAsyncModelKeyValue> {
    const models = await this.getModels();
    return {
      ...super.getModules(),
      ...mapValues(models, (Model: IAsyncModel) => [() => import('./ModelModule'), { Model }]),
    };
  }
}

export default ModelsModule;

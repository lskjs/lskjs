// import Module from '@lskjs/module';
import { IModule, Module2 } from '@lskjs/module';
import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
import { IModelsModule, IAsyncModel, IAsyncModelKeyValue, IModel, IModelKeyValue } from './types';

export class ModelsModule extends Module2 implements IModelsModule {
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
    super.setProp(key, value);
  }

  async model(nameOrNames: string | string[], ...args: any[]): Promise<IModel | IModelKeyValue> {
    const m = await this.module(nameOrNames, ...args);
    if (m instanceof Module2) {
      // @ts-ignore
      return m.model;
    }
    // @ts-ignore
    return mapValues(m, m => m.model)
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

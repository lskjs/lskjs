/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IModule } from '@lskjs/module';

export interface IModel {
  __model: boolean,
}
export type IModelKeyValue = { [name: string]: IModel };

export type IAsyncModel =
  | IModel
  | Promise<IModel>
  | (() => IModel)
  | (() => Promise<IModel>)
  // | any[] // TODO: тут надо чтото придумать

export type IAsyncModelKeyValue = { [name: string]: IAsyncModel };

export interface IModelsModule extends IModule {
  /**
   * from constructor
   */
  __models?: IAsyncModelKeyValue;
  
  /**
   * overridable field
   */
  models?: IAsyncModelKeyValue;

  /**
   * overridable method
   */
  getModels(): IAsyncModelKeyValue | Promise<IAsyncModelKeyValue>;
  model(nameOrNames: string | string[], ...args: any[]): Promise<IModel | IAsyncModelKeyValue>;
}

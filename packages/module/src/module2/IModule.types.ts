/* eslint-disable @typescript-eslint/interface-name-prefix */
import { ILogger as ILog } from '@lskjs/log2';
import { IEventEmitter } from './utils/createEventEmitter/IEventEmitter.types';

/**
 * ворфлоу работы модуля
 */
export interface IModuleWithWorkflow {
  name?: string;
  /**
   * Дата создания экзмпляра класса
   */
  __createdAt: Date; 
  /**
   * Дата инициализации объекта
   */
  __initAt: Date;
  /**
   * Дата запуска объекта
   */
  __runAt: Date;

  /**
   * assignProps -- заподнение класса пропсами
   */
  assignProps(...props: IModulePropsArray): void;

  /**
   * init -- по сути асинхронный конструктор, следует вызывать сразу после new, и дожидаться перед использованием
   */
  init(): Promise<void>;

  /**
   * run -- запуск основных функций класса
   * если у класса не сделан init, он сделает
   * оперируем с переменными, запросы не делаем
   */
  run(): Promise<void>;
  
  /**
   * stop -- grace остановка класса
   * выключаем все подключение и готовимся умирать
   */
  stop(): Promise<void>;
}

export interface IModuleWithСonfig extends IModuleWithWorkflow {
  config?: {
    [name: string]: any;
  };
}

export interface IModuleWithLog extends IModuleWithСonfig {
  log?: ILog;
  createLog(): ILog;
}

export interface IModuleWithEE extends IModuleWithLog, IEventEmitter {
  /**
   * евент эмиттер
   */
  ee?: IEventEmitter;
  /**
   * создаем эвент эмиттер
   */
  createEe(): IEventEmitter;
}

export interface IModuleWithSubmodules extends IModuleWithEE {
  /**
   * private
   */
  __availableModules?: IAsyncModuleKeyValue;

  /**
   * private
   */
  __initedModules?: IModuleKeyValue;
  
  /**
   * private
   */
  __getModules(): Promise<IAsyncModuleKeyValue>;

  parent?: IModule;
  modules?: IAsyncModuleKeyValue;
  getModules(): IAsyncModuleKeyValue | Promise<IAsyncModuleKeyValue>;
  // module(name: string): Promise<IModule>;
  // module(names: string[]): Promise<IModuleKeyValue>;
  module(nameOrNames: string | string[], { run }: { run: boolean }): Promise<IModule | IModuleKeyValue>;
}

export interface IModuleWithApp extends IModuleWithSubmodules {
  app?: IApp;
}

export interface IModule extends IModuleWithApp {}

export type IModuleProp = any;
export type IModuleProps = { [key: string]: IModuleProp } | IApp;
export type IModulePropsArray = IModuleProps[];

export interface IModuleConstructor<T extends IModule> {
  /**
   * создать инстанс и проинициализировать его
   */
  create<T extends IModule>(this: IModuleConstructor<T>, ...props: IModulePropsArray): Promise<T>;
  /**
   * создать инстанс, проинициализировать и запустить
   */
  createAndRun<T extends IModule>(this: IModuleConstructor<T>, ...props: IModulePropsArray): Promise<T>;
  new (): T;
}
export type IModuleKeyValue = { [name: string]: IModule };

/**
 * AsyncModule
 */

export type IAsyncModuleProps = { 
  Module: any; // TODO: IModuleConstructor<T>
  [key: string]: IModuleProp;
};
export type IAsyncModule =
  | IModule
  | any // TODO:  IModuleConstructor 
  | IAsyncModuleProps
  | Promise<IAsyncModule>; 
  // | any[] // TODO: тут надо чтото придумать
  // | () => IAsyncModuleProps;

export type IAsyncModuleKeyValue = { [name: string]: IAsyncModule };


/**
 * App
 */

export type IAppModel = any;
export type IAppModelKeyValue = { [name: string]: IAppModel };

export interface IApp extends IModule {
  models: IAppModelKeyValue;
  model(name: string): Promise<IAppModel>;
  model(names: string[]): Promise<IAppModelKeyValue>;
}
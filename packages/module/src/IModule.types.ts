import { ILogger as ILog } from '@lskjs/log2';

import { IEventEmitter } from './IEventEmitter.types';

export interface IModuleLifecycle {
  /**
   * Дата создания модуля
   */
  create?: Date;
  /**
   * Дата начала инициализации модуля
   */
  initStart?: Date;
  initFinish?: Date;
  /**
   * Дата начала запуска модуля
   */
  runStart?: Date;
  runFinish?: Date;
  /**
   * Дата начала остановки модуля
   */
  stopStart?: Date;
  stopFinish?: Date;

  /**
   * Автоматический запуск модуля родителем
   */
  autorun?: boolean;
}

/**
 * ворфлоу работы модуля
 */
export interface IModuleWithLifecycle {
  name?: string;
  /**
   * Воркфлоу работы модуля
   */
  __lifecycle: IModuleLifecycle;

  /**
   * setProp -- правило заподнение класса пропом
   */
  setProp(key: string, value: IModuleProp): void;

  /**
   * setProps -- заполнение класса пропсами
   */
  setProps(...propsArray: IModuleProps[]): void;

  /**
   * init -- по сути асинхронный конструктор, следует вызывать сразу после new, и дожидаться перед использованием
   */
  __init(): Promise<void>;
  init(): Promise<void>;

  /**
   * run -- запуск основных функций класса
   * если у класса не сделан init, он сделает
   * оперируем с переменными, запросы не делаем
   */
  start(): Promise<void>;
  __run(): Promise<void>;
  run(): Promise<void>;

  /**
   * stop -- grace остановка класса
   * выключаем все подключение и готовимся умирать
   */
  __stop(): Promise<void>;
  stop(): Promise<void>;
}

export interface IModuleWithСonfig extends IModuleWithLifecycle {
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

type IModuleGetter = (m: IModule) => any;

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
  module(
    nameOrNames: string | string[],
    options?: { run?: boolean; throw?: boolean; getter?: IModuleGetter },
  ): Promise<null | IModule | IModuleKeyValue>;
}

export interface IModuleWithApp extends IModuleWithSubmodules {
  app?: IApp;
}

export type IModule = IModuleWithApp;

export type IModuleProp = any;
export type IModuleProps = { [key: string]: IModuleProp } | IApp;

export interface IModuleConstructor<TT extends IModule> {
  /**
   * создать инстанс и проинициализировать его
   */
  create<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T>;
  /**
   * создать инстанс, проинициализировать и запустить
   */
  createAndRun<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T>;
  start<T extends IModule>(this: IModuleConstructor<T>, ...propsArray: IModuleProps[]): Promise<T>;
  new (): TT;
}
export type IModuleKeyValue = { [name: string]: IModule | null };

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

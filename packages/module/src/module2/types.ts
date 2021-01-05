/* eslint-disable @typescript-eslint/interface-name-prefix */
import { ILogger } from '@lskjs/log2';

/**
 * Обработчик события
 */
export type IEventEmitterCallback = (...args: any[]) => void;

/**
 * Event emitter
 */
export interface IEventEmitter {
  /**
   * подписаться на событие
   * @param event назавние события
   * @param callback обработчик события
   */
  on(event: string, callback: IEventEmitterCallback): void;
  /**
   * отослать событие
   * @param event назавние события
   * @param args аргументы которое отсылем в обработчик события
   */
  emit(event: string, ...args: any[]): void;
}

export interface IModuleWithEE extends IEventEmitter {
  /**
   * евент эмиттер
   */
  ee?: IEventEmitter;
  /**
   * создаем эвент эмиттер
   */
  createEventEmitter(): IEventEmitter;
}

export interface IModuleWithСonfig {
  config?: {
    [name: string]: any;
  };
}

/**
 * ворфлоу работы модуля
 */
export interface IModuleWithWorkflow {
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
   * start -- deprecated fallback
   * для старых приложений, запускает init потом run
   * начинаем делаеть запросы и тяжелые операции
   * так же уже можно общаться с соденими модулями или дочкам
   */
  start(): Promise<void>;
  /**
   * stop -- grace остановка класса
   * выключаем все подключение и готовимся умирать
   */
  stop(): Promise<void>;
}

export interface IModuleWithLogger extends IModuleWithСonfig {
  log?: ILogger;
  createLogger(): ILogger;
  config?: {
    log?: any;
    [name: string]: any;
  };
}

export interface IModuleWithCtx {
  _module?: boolean | string;
  app?: IApp;
  parent?: IModule;
}

export type IModuleProps = { [key: string]: any } | IApp;
export type IModulePropsArray = IModuleProps[];

export interface IModuleWithInstance {
  assignProps(...props: IModulePropsArray): void;
  __createdAt: Date;
  __initAt: Date;
  __runAt: Date;
}

export interface IModule
  extends IModuleWithLogger,
    IModuleWithWorkflow,
    IModuleWithEE,
    IModuleWithCtx,
    IModuleWithInstance {
  name?: string;
}

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

export type IAppModel = any;
export type IAppModelKeyValue = { [name: string]: any };

export interface IApp extends IModule {
  models: IAppModelKeyValue;
  model(name: string): Promise<IAppModel>;
  model(names: string[]): Promise<IAppModelKeyValue>;
}

export { ILogger };

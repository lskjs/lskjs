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

export interface IModuleWithInstance {
  // /**
  //  * создать инстанс и проинициализировать его
  //  */
  // static create(...props: any[]): Promise<IModule>;
  // /**
  //  * создать инстанс, проинициализировать и запустить
  //  */
  // static createAndRun(...props: any[]): Promise<IModule>;
  assignProps(...props: any[]): void;
}

export interface IModule
  extends IModuleWithLogger,
    IModuleWithWorkflow,
    IModuleWithEE,
    IModuleWithCtx,
    IModuleWithInstance {
  name?: string;
}

export interface IApp extends IModule {
  models?: {
    [name: string]: any;
  };
}

export { ILogger }; // @ts-ignore

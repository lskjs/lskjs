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

export interface IModuleWithWorkflow {
  init(): Promise<void>;
  run(): Promise<void>;
  start(): Promise<void>;
}

export interface IModuleWithLogger {
  log?: ILogger;
  createLogger(): ILogger;
}

export interface IModuleWithCtx {
  _module?: boolean | string;
  app?: IApp;
  parent?: IModule;
  config?: {
    log?: any;
    [name: string]: any;
  };
}

export interface IModule extends IModuleWithLogger, IModuleWithWorkflow, IModuleWithEE, IModuleWithCtx {
  name?: string;
}

export interface IApp extends IModule {
  models?: {
    [name: string]: any;
  };
}

export { ILogger };

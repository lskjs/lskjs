/* eslint-disable @typescript-eslint/interface-name-prefix */
import { ILogger } from '@lskjs/log2';

export interface IEventEmitter {
  on(event: string, callback: (event: string, ...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

export interface IModuleWithEE {
  ee: IEventEmitter | null;
  createEventEmitter(): IEventEmitter;
}

export interface IModuleWithWorkflow {
  init(): Promise<void>;
  run(): Promise<void>;
  start(): Promise<void>;
}

export interface IModuleWithLogger {
  log?: ILogger | null;
  createLogger(): ILogger;
}

export interface IModuleWithCtx {
  app?: IModule;
  parent?: IModule;
}

export interface IModule extends IModuleWithLogger, IModuleWithWorkflow, IModuleWithEE, IModuleWithCtx {
  name?: string;
}

export { ILogger };
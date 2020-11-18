/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Logger, ILogger } from '@lskjs/log2';
import Emitter from './emitter';

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
  log: ILogger | null;
  createLogger(): ILogger;
}

export interface IModule extends IModuleWithLogger, IModuleWithWorkflow, IModuleWithEE {
  name: string;
}

class Module2 implements IModule {
  name: string;
  ee: IEventEmitter | null;
  log: ILogger | null;
  config: {
    log: object | null | undefined;
    [key: string]: any;
  };

  createLogger(): ILogger {
    const logProps = this.config.log || {};
    return new Logger({ ...logProps, name: this.name });
  }

  createEventEmitter(): IEventEmitter {
    return Emitter();
  }

  on(event: string, callback: (event: string, ...args: any[]) => void): void {
    if (!this.ee) this.ee = this.createEventEmitter();
    this.ee.on(event, callback);
  }

  emit(event: string, ...args: any[]): void {
    if (!this.ee) this.ee = this.createEventEmitter();
    this.ee.emit(event, ...args);
  }

  private __initAt: Date;
  private __runAt: Date;

  async init(): Promise<void> {
    if (this.__initAt) return;
    this.__initAt = new Date();
    this.name = this.constructor.name;
    if (!this.log) this.log = this.createLogger();
    this.log.trace('init');
  }

  async run(): Promise<void> {
    if (this.__runAt) return;
    if (!this.__initAt) await this.init();
    this.__runAt = new Date();
    this.log.trace('run');
  }

  async start(): Promise<void> {
    if (!this.__initAt) await this.init();
    if (!this.__runAt) await this.run();
  }
}

export default Module2;

import BaseLogger, { LoggerLevelType } from '../src/Logger';

export class Logger extends BaseLogger {
  lastLogArgs: any[] | null;
  __log(level: LoggerLevelType, ...args: any[]): void {
    this.lastLogArgs = [level, ...args];
    super.__log(level, ...args);
  }
  lastLoggerArgs: any[] | null;
  __logger(...args: any[]): void {
    this.lastLoggerArgs = args;
  }
}

export default Logger;

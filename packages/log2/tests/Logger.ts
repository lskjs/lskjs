import BaseLogger, { LoggerLevelType } from '../src/Logger';

export class Logger extends BaseLogger {
  lastLog: any[] | null;
  __log(level: LoggerLevelType, ...args: any[]): void {
    this.lastLog = [level, ...args];
    super.__log(level, ...args);
  }
  lastLogger: any[] | null;
  __logger(...args: any[]): void {
    this.lastLogger = args;
  }
}

export default Logger;

import { tryJSONparse } from '@lskjs/env';

import BaseLogger from '../src/Logger';
import { LoggerLevelType } from '../src/types';

export class Logger extends BaseLogger {
  lastLogArgs: any[] | null;
  __log(level: LoggerLevelType, ...args: any[]): void {
    this.lastLogArgs = [level, ...args];
    super.__log(level, ...args);
  }
  lastLoggerArgs: any[] | null;
  log(...args: any[]): void {
    // console.log('Logger.log', ...args);
    // this.lastLoggerArgs = args;
    this.lastLoggerArgs = tryJSONparse(args[0]);
  }
}

export default Logger;

/* eslint-disable no-nested-ternary */
// import debug from 'debug';
import { omitNull } from '@lskjs/algos';

import { levelsPriority } from './config';
import { defaultFormat, getEnvConfig } from './getEnvConfig';
import { stringify } from './pretty/formats';
import { isLsklogWeb } from './pretty/formats/lsklog';
// import { tryPrettyFormat } from './pretty/tryPrettyFormat';
import { prettyFormat } from './pretty/prettyFormat';
import { ILogger, ILoggerMessage, ILoggerProps, LoggerLevelType } from './types';
import { anyRegExps } from './utils/anyRegExps';

export class Logger implements ILogger {
  prefix?: string;
  ns?: string;
  name?: string;
  format?: string = defaultFormat;
  level: LoggerLevelType = 'trace';
  on: RegExp[] = [];
  off: RegExp[] = [];
  constructor(props: ILoggerProps | string = {}) {
    if (typeof props === 'string') {
      this.setProps({ name: props, ...getEnvConfig() });
    } else {
      this.setProps(props);
    }
  }
  setProps({ prefix, ns, name, level, format, on = [], off = [] }: ILoggerProps): void {
    if (prefix) this.prefix = prefix;
    if (ns) this.ns = ns;
    if (on) this.on = on;
    if (off) this.off = off;
    if (name) this.name = name;
    if (format) this.format = format;
    if (level) {
      if (!levelsPriority[level]) {
        throw new Error(`Incorrect level: ${this.level}`);
      }
      this.level = level;
    }
    if (!this.level) this.level = 'trace';
    if (!this.level) this.level = 'trace';
    if (!this.format) this.format = 'lsk';
    if (!this.off) this.off = [];
    if (!this.on) this.on = [];
  }

  static create(props: ILoggerProps): ILogger {
    return new this(props);
  }
  createChild(...propsArray: ILoggerProps[]): ILogger {
    const ns = [this.ns, this.name].filter(Boolean).join('.'); // TODO: подумать, а правильно ли соединять ns и name
    // @ts-ignore
    return new this.constructor(this, { colors: null, ns }, ...propsArray);
  }
  getLevelPriority(level: LoggerLevelType): number {
    return levelsPriority[level] || 0;
  }
  canLog(level: LoggerLevelType): boolean {
    const logLevel = this.getLevelPriority(level);
    const currentLevel = this.getLevelPriority(this.level);
    if (this.ns && anyRegExps(this.off, this.ns)) return false;
    if (this.ns && anyRegExps(this.on, this.ns)) return true;
    return logLevel >= currentLevel;
  }
  fatal(...args: any[]): void {
    if (!this.canLog('fatal')) return;
    this.__log('fatal', ...args);
  }
  error(...args: any[]): void {
    if (!this.canLog('error')) return;
    this.__log('error', ...args);
  }
  warn(...args: any[]): void {
    if (!this.canLog('warn')) return;
    this.__log('warn', ...args);
  }
  debug(...args: any[]): void {
    if (!this.canLog('debug')) return;
    this.__log('debug', ...args);
  }
  info(...args: any[]): void {
    if (!this.canLog('info')) return;
    this.__log('info', ...args);
  }
  trace(...args: any[]): void {
    if (!this.canLog('trace')) return;
    this.__log('trace', ...args);
  }
  // log(...args: any[]): void {
  //   if (!this.canLog('log')) return;
  //   this.__log('log', ...args);
  // }
  log(...args: any[]): void {
    // @ts-ignore
    // eslint-disable-next-line no-console
    if (console._log) {
      // @ts-ignore
      // eslint-disable-next-line no-console
      console._log(...args);
    } else {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }
  __log(level: LoggerLevelType, ...args: any[]): void {
    const [mainArg, ...otherArgs] = args;
    let meta: ILoggerMessage = {
      name: this.name,
      ns: this.ns,
      level,
      time: new Date(),
    };
    let passArgs = args;
    if (isLsklogWeb(mainArg)) {
      meta = {
        ...meta,
        ...mainArg,
      };
      // console.log({mainArg})
      passArgs = otherArgs;
    }
    // // eslint-disable-next-line no-param-reassign
    // if (LOG_FORMAT() !== 'none' && LOG_FORMAT() !== 'pretty') args = args.map((arg) => toString(arg));

    // if (LOG_DATA()) meta.data = passArgs;
    if (this.format === 'none') return;
    const data = omitNull(meta as Record<string, unknown>);
    if (this.format === 'pretty') {
      this.log(...prettyFormat(data, ...passArgs));
      return;
    }
    // console.log({ args, data, str, 'LOG_FORMAT()': LOG_FORMAT() });
    this.log(stringify(this.format || 'lsk', data, ...passArgs));
  }
}

export default Logger;

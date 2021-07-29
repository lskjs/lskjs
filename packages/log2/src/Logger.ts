/* global window */
// import debug from 'debug';
import { getCode, getMessage, isError } from '@lskjs/err/utils';
import colors from 'colors/safe';

import hashCode from './utils/hashCode';
import stringify from './utils/stringify';
import tryParamParse from './utils/tryParamParse';

declare global {
  interface Window {
    __DEV__: boolean;
    __STAGE__: boolean;
  }
}
// import pick from './utils/pick';

// npm install term-size
export const isServer = typeof window === 'undefined';
export const isDev = (isServer ? process.env.NODE_ENV !== 'production' : Boolean(window.__DEV__)) || false;

const pad = (a: string, width = 20): string => {
  const extra = width - a.length;
  if (extra <= 0) return a;
  const start = Math.floor(extra / 2);
  const end = extra - start;
  return a.padStart(start).padEnd(end);
};

const env = (name: string, def: any = null): any => {
  // eslint-disable-next-line no-nested-ternary
  const envs = typeof process !== 'undefined' ? process.env : typeof window !== 'undefined' ? window : {};
  return tryParamParse(envs[name], def);
};

const omitNull = (props: { [key: string]: any }) =>
  Object.keys(props)
    .filter((k) => props[k] != null)
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

const toString = (props: any, ...args: any[]) =>
  typeof props === 'object' ? stringify(props, ...args) : String(props);

// const createRandom = (defaultSeed = Math.random()) => {
//   let seed = defaultSeed;
//   return () => {
//     const x = Math.sin(seed) * 10000;
//     seed += 1;
//     return x - Math.floor(x);
//   };
// };
// export default ({ prefix = 'lsk', ns, name } = {}) => {

export type LoggerLevelType = 'fatal' | 'error' | 'warn' | 'debug' | 'info' | 'trace' | 'log';

interface ILoggerProps {
  prefix?: string | null;
  ns?: string | null;
  name?: string | null;
  level?: string | null;
}

export interface ILogger extends ILoggerProps {
  trace(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  fatal(...args: any[]): void;
  log(...args: any[]): void;
}

// export default ({ prefix = 'lsk', ns, name } = {}) => {
// import debug from 'debug';

// export default ({ prefix = 'lsk', ns, name } = {}) => {
//   const logger = debug([prefix, ns || name].filter(Boolean).join(':'));
//   return {
//     error: (...args) => logger(name, '[e]', ...args),
//     warn: (...args) => logger(name, '[w]', ...args),
//     debug: (...args) => logger(name, '[d]', ...args),
//     info: (...args) => logger(name, '[i]', ...args),
//     trace: (...args) => logger(name, '[t]', ...args),
//   };
// };

// import DebugLevel from 'debug-level';
// export default ({ prefix = 'lsk', ns, name } = {}) => {
//   const logger = new DebugLevel([prefix, ns || name].filter(Boolean).join(':'));
//   logger.trace = logger.debug;
//   return logger;
// };

const levelsPriority = {
  log: 99,
  l: 99,
  fatal: 60,
  f: 60,
  error: 50,
  e: 50,
  warn: 40,
  w: 40,
  info: 30,
  i: 30,
  debug: 20,
  d: 20,
  trace: 10,
  t: 10,
};

const theme = {
  // fatal: 'inverse',
  fatal: 'bgRed',
  error: 'bgBrightRed',
  warn: 'bgYellow',
  debug: 'brightCyan',
  info: 'brightGreen',
  trace: 'gray', // 'white'
  log: 'bgWhite', // 'white'

  randoms: [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'brightRed',
    'brightGreen',
    'brightYellow',
    'brightBlue',
    'brightMagenta',
    'brightCyan',
  ],
};

export class Logger implements ILogger {
  prefix: string | null;
  ns: string | null;
  name: string | null;
  level: string;
  constructor(...propsArray: ILoggerProps[]) {
    this.setProps(...propsArray);
  }
  setProps(...propsArray: ILoggerProps[]): void {
    const fields = ['prefix', 'ns', 'name', 'level', 'randomColors', 'theme', 'colors'];
    propsArray.forEach((props) => {
      Object.keys(props).forEach((key) => {
        if (!fields.includes(key)) return;
        this[key] = props[key];
      });
    });
    if (!this.level) this.level = 'trace';
    if (!levelsPriority[this.level]) throw new Error(`Incorrect level ${this.level}`);
  }
  static create(...propsArray: ILoggerProps[]): ILogger {
    return new this(...propsArray);
  }
  createChild(...propsArray: ILoggerProps[]): ILogger {
    const ns = [this.ns, this.name].filter(Boolean).join('.');
    // @ts-ignore
    return new this.constructor(this, { colors: null, ns }, ...propsArray);
  }
  getLevelPriority(level: string): number {
    return levelsPriority[level] || 0;
  }
  canLog(level: string): boolean {
    const logLevel = this.getLevelPriority(level);
    const currentLevel = this.getLevelPriority(this.level);
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
  log(...args: any[]): void {
    if (!this.canLog('log')) return;
    this.__log('log', ...args);
  }
  color(name: string, str: string): string {
    return colors[this.getColor(name)](str);
  }
  getColor(color: string): string {
    // eslint-disable-next-line no-nested-ternary
    return theme[color] ? theme[color] : colors[color] ? color : 'white';
  }
  getHashColor(key: string): string {
    return theme.randoms[hashCode(key) % theme.randoms.length];
  }
  __logger(...args: any[]): void {
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
    const canPrint = this.getLevelPriority(level) >= this.getLevelPriority(env('LOG_LEVEL', ''));
    if (!canPrint) return;

    const time = new Date();
    const logFormat = env('LOG_FORMAT', isDev ? 'debug' : 'bunyan');
    if (['json', 'bunyan', 'logrus'].includes(logFormat)) {
      const data: {
        code?: any;
        name?: string | null;
        ns?: string | null;
        level?: string | number;
        time?: string | number;
        msg?: string;
        data?: any;
      } = {
        name: this.name,
        ns: this.ns,
      };

      if (logFormat === 'bunyan') {
        data.level = levelsPriority[level];
      } else {
        data.level = level;
      }
      if (logFormat === 'bunyan' || logFormat === 'logrus') {
        data.time = time.toISOString();
      } else {
        data.time = +time;
      }

      // if (logFormat === 'bunyan' || logFormat === 'logrus') {
      // data.msg = toString(args);
      // }

      if (env('LOG_DATA')) {
        data.data = args;
      }

      if (!data.msg) data.msg = getMessage(args);

      data.msg = args
        .map((arg) => {
          if (isError(arg)) {
            if (!data.code) data.code = getCode(arg);
            return getMessage(arg);
          }
          return toString(arg);
        })
        .join(' ');
      // if (!data.msg) data.msg = toString(args);

      this.__logger(omitNull(data));
      return;
    }
    const res: string[] = [];
    if (this.name === 'req') {
      this.__logger(...res);
      return;
    }

    const envLogLevel = env('LOG_L', 'short');
    if (envLogLevel) {
      let logLevelStr = envLogLevel === 'short' ? level[0].toLowerCase() : pad(level, 5);
      logLevelStr = `[${logLevelStr}]`;
      res.push(this.color(this.getColor(level), logLevelStr));
    }

    const envLogAlign = env('LOG_ALIGN');
    const envLogNs = env('LOG_NS', 'true');
    const envLogName = env('LOG_NAME', 'true');

    if (envLogNs || envLogName) {
      let names: any[] = [];
      if (envLogNs) {
        names = (this.ns || '').split('.');
      }
      if (envLogName) {
        names.push(this.name);
      }
      names = names.filter(Boolean);
      let str: string;
      if (names.length) {
        str = names.map((name: string) => this.color(this.getHashColor(name), name)).join(':');
        if (str && envLogAlign) {
          if (envLogAlign === 'left') str = str.padEnd(15);
          if (envLogAlign === 'right') str = str.padStart(15);
        }
        res.push(str);
      }
    }

    let [mainArg] = args;
    const [, ...otherArgs] = args;

    if (typeof mainArg === 'string') {
      if (['[', '<'].includes(mainArg[0]) && [']', '>'].includes(mainArg[mainArg.length - 1])) {
        mainArg = this.color(this.getHashColor(mainArg), mainArg);
      } else if (mainArg.includes('(') || mainArg.includes('[')) {
        mainArg = this.color('brightWhite', mainArg);
      } else if (mainArg.length < 20 && otherArgs.length) {
        mainArg = this.color('white', mainArg);
      }
    }
    res.push(mainArg, ...otherArgs);

    this.__logger(...res);
  }
}

export default Logger;

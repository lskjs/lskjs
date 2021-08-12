// import debug from 'debug';
import { isDev } from '@lskjs/env';
import { getCode, getMessage, isError } from '@lskjs/err/utils';
import colors from 'colors/safe';

import { levelsPriority, theme } from './config';
import { ILogger, ILoggerProps, LoggerLevelType } from './types';
import env from './utils/env';
import hashCode from './utils/hashCode';
import leftPad from './utils/leftPad';
import omit from './utils/omit';
import { omitNull } from './utils/omitNull';
import { pad } from './utils/pad';
import { parseLevel } from './utils/parseLevel';
import { toString } from './utils/toString';

// const createRandom = (defaultSeed = Math.random()) => {
//   let seed = defaultSeed;
//   return () => {
//     const x = Math.sin(seed) * 10000;
//     seed += 1;
//     return x - Math.floor(x);
//   };
// };
// export default ({ prefix = 'lsk', ns, name } = {}) => {

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

// import stringify from './utils/stringify';
// import { tryParamParse } from './utils/tryParamParse';

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
  __getMarker(key: string): string {
    const markers = ['•', '☼', '○', '♠', '♠', '♦', '♥'];
    const marker = markers[hashCode(`2${key}`) % markers.length];
    return this.color(this.getHashColor(key), marker);
  }
  prettyLog(...args: any[]): void {
    const res: string[] = [];
    let [mainArg] = args;
    const [, ...otherArgs] = args;
    const level: LoggerLevelType = parseLevel(mainArg) || 'log';
    let message = mainArg.msg || mainArg.message;
    const { ns, reqId, name } = mainArg; // time

    let secondArg: any;
    if (typeof mainArg === 'string') {
      message = mainArg;
    } else if (typeof mainArg === 'object') {
      const omitParams = [
         //eslint-disable-line
        'level',
        'msg',
        'message',
        'time',
        'ns',
        'reqId',
        'name',

        'hostname',
        'pid',
        'v',
      ];
      secondArg = omit(mainArg, omitParams);
    } else {
      return;
    }

    if (secondArg && Object.keys(secondArg).length) {
      otherArgs.unshift(secondArg);
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

    let names: any[] = [];
    if (name === 'req') {
      names = [this.__getMarker(reqId)];
    } else if (envLogNs || envLogName) {
      if (envLogNs) {
        names = (ns || '').split('.');
      }
      if (envLogName) {
        names.push(name);
      }
      names = names.filter(Boolean);
    }

    if (names.length) {
      let str: string;
      str = names.map((n: string) => this.color(this.getHashColor(n), n)).join(':');
      if (str && envLogAlign) {
        if (envLogAlign === 'left') str = str.padEnd(15);
        if (envLogAlign === 'right') str = str.padStart(15);
      }
      res.push(str);
    }

    if (name === 'req') {
      const urlPad = -20;
      let msg;
      if (level === 'debug') {
        msg = `${leftPad(mainArg.method, 4)} ${leftPad(mainArg.url, urlPad)} #${mainArg.reqId}`; // + '\x1b[33mYAUEBAN\x1b[0m AZAZA'
      } else {
        const t = (mainArg.duration || 0).toFixed(3);
        const method = leftPad(mainArg.method, 4);
        const length = mainArg.length || 0;
        if (mainArg.method === 'WS') {
          msg = `${method} ${leftPad(mainArg.url, urlPad)} #${mainArg.reqId} ${leftPad(t, 7)}ms `;
        } else {
          // eslint-disable-next-line max-len
          msg = `${method} ${leftPad(mainArg.url, urlPad)} #${mainArg.reqId} ${leftPad(mainArg.status, 3)} ${leftPad(t, 7)}ms ${length}b `; // eslint-disable-line prettier/prettier
        }
      }
      mainArg = msg;
    }

    if (typeof message === 'string') {
      if (['[', '<'].includes(message[0]) && [']', '>'].includes(message[message.length - 1])) {
        message = this.color(this.getHashColor(message), message);
      } else if (message.includes('(') || message.includes('[')) {
        message = this.color('brightWhite', message);
      } else if (message.length < 20 && otherArgs.length) {
        message = this.color('white', message);
      }
    }
    res.push(message, ...otherArgs);

    this.__logger(...res);
  }
  __loggerPretty(level: LoggerLevelType, ...args: any[]): void {
    const res: string[] = [];

    let [mainArg] = args;
    const [, ...otherArgs] = args;

    const envLogLevel = env('LOG_L', 'short');
    if (envLogLevel) {
      let logLevelStr = envLogLevel === 'short' ? level[0].toLowerCase() : pad(level, 5);
      logLevelStr = `[${logLevelStr}]`;
      res.push(this.color(this.getColor(level), logLevelStr));
    }

    const envLogAlign = env('LOG_ALIGN');
    const envLogNs = env('LOG_NS', 'true');
    const envLogName = env('LOG_NAME', 'true');

    let names: any[] = [];
    if (this.name === 'req') {
      names = [this.__getMarker(mainArg.reqId)];
    } else if (envLogNs || envLogName) {
      if (envLogNs) {
        names = (this.ns || '').split('.');
      }
      if (envLogName) {
        names.push(this.name);
      }
      names = names.filter(Boolean);
    }

    if (names.length) {
      let str: string;
      str = names.map((name: string) => this.color(this.getHashColor(name), name)).join(':');
      if (str && envLogAlign) {
        if (envLogAlign === 'left') str = str.padEnd(15);
        if (envLogAlign === 'right') str = str.padStart(15);
      }
      res.push(str);
    }

    if (this.name === 'req') {
      const urlPad = -20;
      let msg;
      if (level === 'debug') {
        msg = `${leftPad(mainArg.method, 4)} ${leftPad(mainArg.url, urlPad)} #${mainArg.reqId}`; // + '\x1b[33mYAUEBAN\x1b[0m AZAZA'
      } else {
        const time = (mainArg.duration || 0).toFixed(3);
        const method = leftPad(mainArg.method, 4);
        const length = mainArg.length || 0;
        if (mainArg.method === 'WS') {
          msg = `${method} ${leftPad(mainArg.url, urlPad)} #${mainArg.reqId} ${leftPad(time, 7)}ms `;
        } else {
          msg = `${method} ${leftPad(mainArg.url, urlPad)} #${mainArg.reqId} ${leftPad(mainArg.status, 3)} ${leftPad(
            time,
            7,
          )}ms ${length}b `;
        }
      }
      mainArg = msg;
    }

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
  __log(level: LoggerLevelType, ...args: any[]): void {
    const canPrint = this.getLevelPriority(level) >= this.getLevelPriority(env('LOG_LEVEL', ''));
    if (!canPrint) return;

    const logFormat = env('LOG_FORMAT', isDev ? 'debug' : 'logrus');
    if (!['json', 'bunyan', 'logrus'].includes(logFormat)) {
      this.__loggerPretty(level, ...args);
      return;
    }

    const time = new Date();
    let data: {
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

    // if (!data.msg) data.msg = getMessage(args);
    if (this.name === 'req') {
      // console.log('REQQQQ', ...args);
      data = {
        ...data,
        ...args[0],
      };
      // args
      // .forEach((arg) => {

      //   if (isError(arg)) {
      //     if (!data.code) data.code = getCode(arg);
      //     return getMessage(arg);
      //   }
      //   return toString(arg);
      // })
      // .join(' ');
      // this.__logger(...res);
      // return;
    } else {
      data.msg = args
        .map((arg) => {
          if (isError(arg)) {
            if (!data.code) data.code = getCode(arg);
            return getMessage(arg);
          }
          return toString(arg);
        })
        .join(' ');
    }
    data = omitNull(data);

    // if (!data.msg) data.msg = toString(args)
    if (isDev) {
      this.__logger(data);
      return;
    }
    this.__logger(toString(data));
  }
}

export default Logger;

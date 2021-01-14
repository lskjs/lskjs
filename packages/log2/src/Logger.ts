/* eslint-disable @typescript-eslint/interface-name-prefix */
// import debug from 'debug';
import colors from 'colors/safe';
import hashCode from './utils/hashCode';
import tryParamParse from './utils/tryParamParse';
// import pick from './utils/pick';

// npm install term-size

const pad = (a: string, width = 20): string => {
  const extra = width - a.length;
  if (extra <= 0) return a;
  const start = Math.floor(extra / 2);
  const end = extra - start;
  return a.padStart(start).padEnd(end);
};

const env = (name: string, def: any = null): any => {
  const envs = typeof process !== 'undefined' ? process.env : typeof window !== 'undefined' ? window : {};
  return tryParamParse(envs[name], def);
};

const omitNull = (props: { [key: string]: any }) => {
  const { ns, ...otherProps } = props;
  if (ns) return props;
  return otherProps;
};

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
  prefix: string | null;
  ns: string | null;
  name: string | null;
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
    const fields = ['prefix', 'ns', 'name', 'randomColors', 'theme', 'colors'];
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
    return this.getLevelPriority(level) >= this.getLevelPriority(this.level);
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
    return theme[color] ? theme[color] : colors[color] ? color : 'white';
  }
  getHashColor(key: string): string {
    return theme.randoms[hashCode(key) % theme.randoms.length];
  }
  __logger(...args: any[]): void {
    // @ts-ignore
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
    if (env('LOG_JSON', false)) {
      this.__logger(
        omitNull({
          name: this.name,
          ns: this.ns,
          level,
          date: Date.now(),
          content: args,
        }),
      );
      return;
    }

    const res = [];
    const envLogLevel = env('LOG_L', 'short');
    if (envLogLevel) {
      let logLevelStr = envLogLevel === 'short' ? level[0].toLowerCase() : pad(level, 5);
      logLevelStr = `[${logLevelStr}]`;
      res.push(this.color(this.getColor(level), logLevelStr));
    }

    const envLogAlign = env('LOG_ALIGN');
    const envLogNs = env('LOG_L', 'true');
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

    let [mainArg, ...otherArgs] = args;
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

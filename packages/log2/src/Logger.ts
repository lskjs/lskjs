/* eslint-disable @typescript-eslint/interface-name-prefix */
// import debug from 'debug';
import colors from 'colors/safe';
import hashCode from '@lskjs/utils/hashCode';
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
  randomColors: number;
  theme: {
    fatal: string | string[];
    error: string | string[];
    warn: string | string[];
    debug: string | string[];
    info: string | string[];
    trace: string | string[];
    [key: string]: string | string[];
  };
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

export class Logger implements ILogger {
  prefix: string | null;
  ns: string | null;
  name: string | null;
  levels = ['fatal', 'error', 'warn', 'debug', 'info', 'trace'];
  randomColors = 7;
  theme = {
    // fatal: 'inverse',
    fatal: 'bgBrightRed',
    error: 'red',
    warn: 'yellow',
    debug: 'blue',
    info: 'green',
    trace: 'gray', // 'white'

    random0: [/* 'bold', */ 'white'],
    random1: [/* 'bold', */ 'green'],
    random2: [/* 'bold', */ 'yellow'],
    random3: [/* 'bold', */ 'blue'],
    random4: [/* 'bold', */ 'magenta'],
    random5: [/* 'bold', */ 'cyan'],
    random6: [/* 'bold', */ 'brightMagenta'],
  };
  constructor(props: ILoggerProps) {
    Object.assign(this, props);
    colors.setTheme(this.theme);
  }

  fatal(...args: any[]): void {
    this._log('fatal', ...args);
  }
  error(...args: any[]): void {
    this._log('error', ...args);
  }
  warn(...args: any[]): void {
    this._log('warn', ...args);
  }
  debug(...args: any[]): void {
    this._log('debug', ...args);
  }
  info(...args: any[]): void {
    this._log('info', ...args);
  }
  trace(...args: any[]): void {
    this._log('trace', ...args);
  }
  log(...args: any[]): void {
    this._log('info', ...args);
  }

  color(name: string, str: string): string {
    return colors[name](str);
  }
  // req() {
  //   return this;
  // }
  getHashColor(key: string): string {
    return `random${hashCode(key) % this.randomColors}`;
  }
  getColor(color: string): string {
    return this.theme[color] || 'white';
  }
  _logger(...args: any[]): void {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
  _log(level: LoggerLevelType, ...args: any[]): void {
    const logPrefix = [this.prefix, this.ns || this.name].filter(Boolean).join(':');
    const levelStr = `[${level[0].toLowerCase()}]`;
    const arr = [
      this.color(this.getColor(level), levelStr), // asda
      this.color(this.getHashColor(logPrefix), logPrefix),
      ...args,
    ];
    this._logger(...arr);
  }
}

export default Logger;

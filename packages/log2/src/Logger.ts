/* eslint-disable @typescript-eslint/interface-name-prefix */
// import debug from 'debug';
import colors from 'colors/safe';
import hashCode from './utils/hashCode';
import leftPad from './utils/leftPad';
import tryParamParse from './utils/tryParamParse';
// import pick from './utils/pick';

// npm install term-size


const env = (name: string, def: any = null): any => {
  const envs = typeof process !== 'undefined' ? process.env : typeof window !== 'undefined' ? window : {};
  return tryParamParse(process.env[name], def);
};

const omitNull = (props: {[key: string]: any}) => {
  const { ns, ...otherProps } = props;
  if (ns) return props;
  return otherProps;
};

const createColors = () => {
  return colors;
  const newColors = {};
  Object.assign(newColors, colors);
  return newColors;
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
  level: string;
  levelsPriority = {
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
  randomColors = 7;
  colors: any;
  theme = {
    // fatal: 'inverse',
    fatal: 'bgBrightRed',
    error: 'bgBrightRed',
    warn: 'red', // 'yellow',
    debug: 'blue',
    info: 'green',
    trace: 'gray', // 'white'
    log: 'white', // 'white'

    random0: [/* 'bold', */ 'white'],
    random1: [/* 'bold', */ 'green'],
    random2: [/* 'bold', */ 'yellow'],
    random3: [/* 'bold', */ 'blue'],
    random4: [/* 'bold', */ 'magenta'],
    random5: [/* 'bold', */ 'cyan'],
    random6: [/* 'bold', */ 'brightMagenta'],
  };

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
    if (!this.levelsPriority[this.level]) throw new Error(`Incorrect level ${this.level}`);
    if (!this.colors) this.colors = createColors();
    this.colors.setTheme(this.theme);
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
    return this.levelsPriority[level] || 0;
  }

  canLog(level: string): boolean {
    return this.getLevelPriority(level) >= this.getLevelPriority(this.level);
  }
  __canPrint(level: string): boolean {
    return this.getLevelPriority(level) >= this.getLevelPriority(env('LOG_LEVEL', ''));
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
    // console.log('2222', this.colors, name)
    return (this.colors[name] || this.colors.white)(str);
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
    if (!this.__canPrint(level)) return;
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
    const rawNames: any[] = [];
    if (env('LOG_NS', true)) {
      rawNames.push(this.ns);
    }
    if (env('LOG_NAME', true)) {
      rawNames.push(this.name);
    }
    const names = rawNames.filter(Boolean);
    const pad = (str = '') => {
      if (env('LOG_ALIGN') === 'left') return str.padEnd(15);
      if (env('LOG_ALIGN') === 'right') return str.padStart(15);
      return str;
    };
    const logPrefix = names.length ? pad(names.join(':')) : null;

    const levelStr = `[${level[0].toLowerCase()}]`;

    let [mainArg, ...otherArgs] = args;

    if (typeof mainArg === 'string') {
      if (['[', '<'].includes(mainArg[0]) && [']', '>'].includes(mainArg[mainArg.length - 1])) {
        mainArg = this.color(this.getHashColor(mainArg), mainArg);
      } else if (mainArg.includes('(')) {
        mainArg = this.color('brightWhite', mainArg);
      } else if (mainArg.length < 20 && otherArgs.length) {
        mainArg = this.color('white', mainArg);
      }
    }

    const arr = [mainArg, ...otherArgs];
    arr.unshift(
      ...[
        this.color(this.getColor(level), levelStr),
        logPrefix ? this.color(this.getHashColor(logPrefix), logPrefix) : null,
      ].filter(Boolean),
    );

    this.__logger(...arr);
  }
}

export default Logger;

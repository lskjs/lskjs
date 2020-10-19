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

// console.log(colors.bold(colors.black('black')));
// console.log(colors.bold(colors.red('red')));
// console.log(colors.bold(colors.green('green')));
// console.log(colors.bold(colors.yellow('yellow')));
// console.log(colors.bold(colors.blue('blue')));
// console.log(colors.bold(colors.magenta('magenta')));
// console.log(colors.bold(colors.cyan('cyan')));
// console.log(colors.bold(colors.white('white')));
// console.log(colors.bold(colors.gray('gray')));
// console.log(colors.bold(colors.grey('grey')));

// console.log(colors.bold(colors.brightRed('brightRed')));
// console.log(colors.bold(colors.brightGreen('brightGreen')));
// console.log(colors.bold(colors.brightYellow('brightYellow')));
// console.log(colors.bold(colors.brightBlue('brightBlue')));
// console.log(colors.bold(colors.brightMagenta('brightMagenta')));
// console.log(colors.bold(colors.brightCyan('brightCyan')));
// console.log(colors.bold(colors.brightWhite('brightWhite')));

// console.log(colors.black('black'))
// console.log(colors.red('red'))
// console.log(colors.green('green'))
// console.log(colors.yellow('yellow'))
// console.log(colors.blue('blue'))
// console.log(colors.magenta('magenta'))
// console.log(colors.cyan('cyan'))
// console.log(colors.white('white'))
// console.log(colors.gray('gray'))
// console.log(colors.grey('grey'))

// console.log(colors.brightRed('brightRed'))
// console.log(colors.brightGreen('brightGreen'))
// console.log(colors.brightYellow('brightYellow'))
// console.log(colors.brightBlue('brightBlue'))
// console.log(colors.brightMagenta('brightMagenta'))
// console.log(colors.brightCyan('brightCyan'))
// console.log(colors.brightWhite('brightWhite'))

// console.log(colors.bgBlack('bgBlack'))
// console.log(colors.bgRed('bgRed'))
// console.log(colors.bgGreen('bgGreen'))
// console.log(colors.bgYellow('bgYellow'))
// console.log(colors.bgBlue('bgBlue'))
// console.log(colors.bgMagenta('bgMagenta'))
// console.log(colors.bgCyan('bgCyan'))
// console.log(colors.bgWhite('bgWhite'))
// console.log(colors.bgGray('bgGray'))
// console.log(colors.bgGrey('bgGrey'))

// console.log(colors.bgBrightRed('bgBrightRed'))
// console.log(colors.bgBrightGreen('bgBrightGreen'))
// console.log(colors.bgBrightYellow('bgBrightYellow'))
// console.log(colors.bgBrightBlue('bgBrightBlue'))
// console.log(colors.bgBrightMagenta('bgBrightMagenta'))
// console.log(colors.bgBrightCyan('bgBrightCyan'))
// console.log(colors.bgBrightWhite('bgBrightWhite'))

// console.log(colors.reset('reset'))
// console.log(colors.bold('bold'))
// console.log(colors.dim('dim'))
// console.log(colors.italic('italic'))
// console.log(colors.underline('underline'))
// console.log(colors.inverse('inverse'))
// console.log(colors.hidden('hidden'))
// console.log(colors.strikethrough('strikethrough'))

// console.log(colors.rainbow('rainbow'))
// console.log(colors.zebra('zebra'))
// console.log(colors.america('america'))
// console.log(colors.trap('trap'))
// console.log(colors.random('random'))

export default class Logger {
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
  constructor(props) {
    Object.assign(this, props);
    this.levels.forEach((level) => {
      this[level] = (...args) => this._log(level, ...args);
    });
    colors.setTheme(this.theme);
  }
  color(name, ...args) {
    return colors[name](...args);
  }
  req() {
    return this;
  }
  getHashColor(key) {
    return `random${hashCode(key) % this.randomColors}`;
  }
  getColor(color) {
    return this.theme[color] || 'white';
  }
  _logger(...args) {
    // eslint-disable-next-line no-console
    return console.log(...args);
  }
  _log(level, ...args) {
    const logPrefix = [this.prefix, this.ns || this.name].filter(Boolean).join(':');
    const levelStr = `[${level[0].toLowerCase()}]`;
    const arr = [
      this.color(this.getColor(level), levelStr), // asda
      this.color(this.getHashColor(logPrefix), logPrefix),
      ...args,
    ];
    return this._logger(...arr);
  }
}

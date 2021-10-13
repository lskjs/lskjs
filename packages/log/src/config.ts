// import { isServer } from '@lskjs/env';

export const levelsPriority = {
  log: 99,
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10,
};

export const theme = {
  // fatal: 'inverse',

  fatal: ['bgRed'],
  error: ['bold', 'bgRed'],
  warn: ['bgYellow'],
  debug: ['bold', 'cyan'],
  info: ['bold', 'green'],
  trace: ['gray'],
  log: ['bgWhite'],
  // fatal: !isServer ? 'bgRed' : 'background-color: red; color: #fff;',
  // error: !isServer ? 'bgBrightRed' : 'background-color: red; color: #fff;',
  // warn: !isServer ? 'bgYellow' : 'background-color: red; color: #fff;',
  // debug: !isServer ? 'brightCyan' : 'background-color: red; color: #fff;',
  // info: !isServer ? 'brightGreen' : 'background-color: red; color: #fff;',
  // trace: !isServer ? 'gray' : 'background-color: red; color: #fff;', // 'white'
  // log: !isServer ? 'bgWhite' : 'background-color: red; color: #fff;', // 'white'

  randoms: [
    ['red'],
    ['green'],
    ['yellow'],
    ['blue'],
    ['magenta'],
    ['cyan'],
    ['bold', 'red'],
    ['bold', 'green'],
    ['bold', 'yellow'],
    ['bold', 'blue'],
    ['bold', 'magenta'],
    ['bold', 'cyan'],
    // ['dim', 'red'],
    // ['dim', 'green'],
    // ['dim', 'yellow'],
    // ['dim', 'blue'],
    // ['dim', 'magenta'],
    // ['dim', 'cyan'],
  ],
};

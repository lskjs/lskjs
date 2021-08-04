export const levelsPriority = {
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
export const reverseLevels = {
  log: 'log',
  l: 'log',
  99: 'log',

  fatal: 'fatal',
  f: 'fatal',
  60: 'fatal',

  error: 'error',
  e: 'error',
  50: 'error',

  warn: 'warn',
  warning: 'warn',
  w: 'warn',
  40: 'warn',

  info: 'info',
  i: 'info',
  30: 'info',

  debug: 'debug',
  d: 'debug',
  20: 'debug',

  trace: 'trace',
  t: 'trace',
  10: 'trace',
};

export const theme = {
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

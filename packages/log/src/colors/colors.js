/* global window */
import { isClient, isServer } from '@lskjs/env';

const processOrNull = isClient ? {} : process;
const processEnvOrWindow = isClient ? window.env : process.env;

export const isColorSupported =
  !('NO_COLOR' in processEnvOrWindow || process.argv.includes('--no-color')) &&
  (isClient ||
    'FORCE_COLOR' in processEnvOrWindow ||
    processOrNull.argv.includes('--color') ||
    processOrNull.platform === 'win32' ||
    (isServer && require('tty').isatty(1) && process.env.TERM !== 'dumb') ||
    'CI' in processEnvOrWindow);

export function replaceClose(string, close, replace, index) {
  const start = string.substring(0, index) + replace;
  const end = string.substring(index + close.length);
  const nextIndex = end.indexOf(close);
  // eslint-disable-next-line no-bitwise
  return !~nextIndex ? start + end : start + replaceClose(end, close, replace, nextIndex);
}
export function formatter(open, close, replace = open) {
  return (input) => {
    const string = `${input}`;
    const index = string.indexOf(close, open.length);
    // eslint-disable-next-line no-bitwise
    return !~index ? open + string + close : open + replaceClose(string, close, replace, index) + close;
  };
}

export function createColors(enabled = isColorSupported) {
  return {
    isColorSupported: enabled,
    reset: enabled ? (s) => `\x1b[0m${s}\x1b[0m` : String,
    bold: enabled ? formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m') : String,
    dim: enabled ? formatter('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m') : String,
    italic: enabled ? formatter('\x1b[3m', '\x1b[23m') : String,
    underline: enabled ? formatter('\x1b[4m', '\x1b[24m') : String,
    inverse: enabled ? formatter('\x1b[7m', '\x1b[27m') : String,
    hidden: enabled ? formatter('\x1b[8m', '\x1b[28m') : String,
    strikethrough: enabled ? formatter('\x1b[9m', '\x1b[29m') : String,
    black: enabled ? formatter('\x1b[30m', '\x1b[39m') : String,
    red: enabled ? formatter('\x1b[31m', '\x1b[39m') : String,
    green: enabled ? formatter('\x1b[32m', '\x1b[39m') : String,
    yellow: enabled ? formatter('\x1b[33m', '\x1b[39m') : String,
    blue: enabled ? formatter('\x1b[34m', '\x1b[39m') : String,
    magenta: enabled ? formatter('\x1b[35m', '\x1b[39m') : String,
    cyan: enabled ? formatter('\x1b[36m', '\x1b[39m') : String,
    white: enabled ? formatter('\x1b[37m', '\x1b[39m') : String,
    gray: enabled ? formatter('\x1b[90m', '\x1b[39m') : String,
    bgBlack: enabled ? formatter('\x1b[40m', '\x1b[49m') : String,
    bgRed: enabled ? formatter('\x1b[41m', '\x1b[49m') : String,
    bgGreen: enabled ? formatter('\x1b[42m', '\x1b[49m') : String,
    bgYellow: enabled ? formatter('\x1b[43m', '\x1b[49m') : String,
    bgBlue: enabled ? formatter('\x1b[44m', '\x1b[49m') : String,
    bgMagenta: enabled ? formatter('\x1b[45m', '\x1b[49m') : String,
    bgCyan: enabled ? formatter('\x1b[46m', '\x1b[49m') : String,
    bgWhite: enabled ? formatter('\x1b[47m', '\x1b[49m') : String,
  };
}

export default createColors();

import { isSupported } from './isSupported';
import { Colors, FormatterInput } from './types';
import { formatter } from './utils';

export const createColors = (on = isSupported): Colors => ({
  on,
  reset: on ? (s: FormatterInput) => `\x1b[0m${s}\x1b[0m` : String,
  bold: on ? formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m') : String,
  dim: on ? formatter('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m') : String,
  italic: on ? formatter('\x1b[3m', '\x1b[23m') : String,
  underline: on ? formatter('\x1b[4m', '\x1b[24m') : String,
  inverse: on ? formatter('\x1b[7m', '\x1b[27m') : String,
  hidden: on ? formatter('\x1b[8m', '\x1b[28m') : String,
  strikethrough: on ? formatter('\x1b[9m', '\x1b[29m') : String,
  black: on ? formatter('\x1b[30m', '\x1b[39m') : String,
  red: on ? formatter('\x1b[31m', '\x1b[39m') : String,
  green: on ? formatter('\x1b[32m', '\x1b[39m') : String,
  yellow: on ? formatter('\x1b[33m', '\x1b[39m') : String,
  blue: on ? formatter('\x1b[34m', '\x1b[39m') : String,
  magenta: on ? formatter('\x1b[35m', '\x1b[39m') : String,
  cyan: on ? formatter('\x1b[36m', '\x1b[39m') : String,
  white: on ? formatter('\x1b[37m', '\x1b[39m') : String,
  gray: on ? formatter('\x1b[90m', '\x1b[39m') : String,
  bgBlack: on ? formatter('\x1b[40m', '\x1b[49m') : String,
  bgRed: on ? formatter('\x1b[41m', '\x1b[49m') : String,
  bgGreen: on ? formatter('\x1b[42m', '\x1b[49m') : String,
  bgYellow: on ? formatter('\x1b[43m', '\x1b[49m') : String,
  bgBlue: on ? formatter('\x1b[44m', '\x1b[49m') : String,
  bgMagenta: on ? formatter('\x1b[45m', '\x1b[49m') : String,
  bgCyan: on ? formatter('\x1b[46m', '\x1b[49m') : String,
  bgWhite: on ? formatter('\x1b[47m', '\x1b[49m') : String,
});

export default createColors;

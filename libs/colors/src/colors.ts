import { FormatterInput } from './types';
import { formatter } from './utils';

export const reset = (s: FormatterInput) => `\x1b[0m${s}\x1b[0m`;
export const bold = formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m');
export const dim = formatter('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m');
export const italic = formatter('\x1b[3m', '\x1b[23m');
export const underline = formatter('\x1b[4m', '\x1b[24m');
export const inverse = formatter('\x1b[7m', '\x1b[27m');
export const hidden = formatter('\x1b[8m', '\x1b[28m');
export const strikethrough = formatter('\x1b[9m', '\x1b[29m');
export const black = formatter('\x1b[30m', '\x1b[39m');
export const red = formatter('\x1b[31m', '\x1b[39m');
export const green = formatter('\x1b[32m', '\x1b[39m');
export const yellow = formatter('\x1b[33m', '\x1b[39m');
export const blue = formatter('\x1b[34m', '\x1b[39m');
export const magenta = formatter('\x1b[35m', '\x1b[39m');
export const cyan = formatter('\x1b[36m', '\x1b[39m');
export const white = formatter('\x1b[37m', '\x1b[39m');
export const gray = formatter('\x1b[90m', '\x1b[39m');
export const bgBlack = formatter('\x1b[40m', '\x1b[49m');
export const bgRed = formatter('\x1b[41m', '\x1b[49m');
export const bgGreen = formatter('\x1b[42m', '\x1b[49m');
export const bgYellow = formatter('\x1b[43m', '\x1b[49m');
export const bgBlue = formatter('\x1b[44m', '\x1b[49m');
export const bgMagenta = formatter('\x1b[45m', '\x1b[49m');
export const bgCyan = formatter('\x1b[46m', '\x1b[49m');
export const bgWhite = formatter('\x1b[47m', '\x1b[49m');

export const colors = {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
};

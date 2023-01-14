export type FormatterInput = string | number | null | undefined;
export type Formatter = (input: FormatterInput) => string;

export enum ColorsAndStyles {
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
}
export interface Colors {
  isColorSupported: boolean;
  reset: Formatter;
  bold: Formatter;
  dim: Formatter;
  italic: Formatter;
  underline: Formatter;
  inverse: Formatter;
  hidden: Formatter;
  strikethrough: Formatter;
  black: Formatter;
  red: Formatter;
  green: Formatter;
  yellow: Formatter;
  blue: Formatter;
  magenta: Formatter;
  cyan: Formatter;
  white: Formatter;
  gray: Formatter;
  bgBlack: Formatter;
  bgRed: Formatter;
  bgGreen: Formatter;
  bgYellow: Formatter;
  bgBlue: Formatter;
  bgMagenta: Formatter;
  bgCyan: Formatter;
  bgWhite: Formatter;
}

// https://github.com/alexeyraspopov/picocolors/blob/main/picocolors.js

import { Formatter } from './types';

export function replaceClose(
  string: string,
  close: string,
  replace: string,
  index: number
): string {
  const start = string.substring(0, index) + replace;
  const end = string.substring(index + close.length);
  const nextIndex = end.indexOf(close);
  // eslint-disable-next-line no-bitwise
  return !~nextIndex
    ? start + end
    : start + replaceClose(end, close, replace, nextIndex);
}

export function formatter(
  open: string,
  close: string,
  replace = open
): Formatter {
  return (input: any) => {
    const string = String(input);
    const index = string.indexOf(close, open.length);
    // eslint-disable-next-line no-bitwise
    return !~index
      ? open + string + close
      : open + replaceClose(string, close, replace, index) + close;
  };
}

/* eslint-disable no-nested-ternary */

import { colors } from './colors';
import isSupported from './isSupported';
import { Color } from './types';

export function colorize(
  str: string,
  colorName?: Color | Color[] | null
): string {
  if (!isSupported) return str;
  const colorNames = Array.isArray(colorName)
    ? colorName
    : colorName
    ? [colorName]
    : [];

  return colorNames.reduce((msg, color) => {
    const colorFn = colors?.[color];
    if (!colorFn) return msg;
    return colorFn(msg);
  }, str);
}

export default colorize;

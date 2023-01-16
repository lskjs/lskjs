import { colorize } from '@lskjs/colors';

import { randomColors, theme } from './config';
import { ThemeKey } from './types';
import hashCode from './utils/hashCode';

export function themeizeRandom(
  str: string,
  randomName?: string | number | null
): string {
  const colors =
    randomColors[hashCode(randomName || '') % randomColors.length] || [];
  return colorize(str, colors);
}

export function themeize(str: string, themeKey?: ThemeKey | null): string {
  const colors = themeKey ? theme[themeKey] : [];
  return colorize(str, colors);
}

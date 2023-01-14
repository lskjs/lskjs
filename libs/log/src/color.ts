import { colors, ColorsAndStyles } from './colors';
import { randomColors, theme } from './config';
import { ThemeKey } from './types';
import hashCode from './utils/hashCode';

export function getColors(name?: ThemeKey | null): ColorsAndStyles[] {
  if (!name) return [];
  if (theme[name]) return theme[name];
  // eslint-disable-next-line no-nested-ternary
  return theme[name] ? theme[name] : [];
  // return theme[name] ? theme[name] : colors ? (colors[name] ? [name] : []) : [];
}

export function getHashColors(name: string | number): ColorsAndStyles[] {
  return randomColors[hashCode(name) % theme.randoms.length] || [];
}

export function hashColor(name: string | number, str: string): string {
  const hashColors = getHashColors(name);
  return hashColors.reduce((msg, colorName) => {
    const colorFn = colors && colors[colorName] ? colors[colorName] : null;
    // eslint-disable-next-line no-console
    if (!colorFn) console.log('!colors[colorName]', { colorName });
    if (!colorFn) return msg;
    return colorFn(msg);
  }, str);
}

export function color(
  nameOrNames: string | null | string[],
  str: string
): string {
  const hashColors = Array.isArray(nameOrNames)
    ? nameOrNames
    : getColors(nameOrNames);
  return hashColors.reduce((msg, colorName) => {
    const colorFn = colors && colors[colorName] ? colors[colorName] : null;
    // eslint-disable-next-line no-console
    if (!colorFn) console.log('!colors[colorName]', { colorName });
    if (!colorFn) return msg;
    return colorFn(msg);
  }, str);
}

export default color;

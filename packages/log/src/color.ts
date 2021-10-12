import colors from './colors';
import { theme } from './config';
import hashCode from './utils/hashCode';

export function getColors(name: string | null): string[] {
  if (!name) return [];
  // eslint-disable-next-line no-nested-ternary
  return theme[name] ? theme[name] : colors ? (colors[name] ? [name] : []) : [];
}

export function getHashColors(name: string | number): string[] {
  return theme.randoms[hashCode(name) % theme.randoms.length] || [];
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

export function color(name: string | null, str: string): string {
  const hashColors = getColors(name);
  return hashColors.reduce((msg, colorName) => {
    const colorFn = colors && colors[colorName] ? colors[colorName] : null;
    // eslint-disable-next-line no-console
    if (!colorFn) console.log('!colors[colorName]', { colorName });
    if (!colorFn) return msg;
    return colorFn(msg);
  }, str);
}

export default color;

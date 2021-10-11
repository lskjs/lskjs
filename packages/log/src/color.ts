import colors from './colors';
import { theme } from './config';
import hashCode from './utils/hashCode';

export function getColors(name: string | null): string[] {
  if (!name) return [];
  // eslint-disable-next-line no-nested-ternary
  return theme[name] ? theme[name] : colors[name] ? [name] : [];
}

export function getHashColors(name: string): string[] {
  return theme.randoms[hashCode(name) % theme.randoms.length] || [];
}

export function hashColor(name: string, str: string): string {
  const hashColors = getHashColors(name);
  return hashColors.reduce((msg, colorName) => {
    // eslint-disable-next-line no-console
    if (!colors[colorName]) console.log('!nanocolors[colorName]', { colorName });
    return colors[colorName](msg);
  }, str);
}

export function color(name: string | null, str: string): string {
  const hashColors = getColors(name);
  return hashColors.reduce((msg, colorName) => {
    // eslint-disable-next-line no-console
    if (!colors[colorName]) console.log('!nanocolors[colorName]', { colorName });
    return colors[colorName](msg);
  }, str);
}

export default color;

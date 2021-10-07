import nanocolors from 'nanocolors';

import { theme } from './config';
import hashCode from './utils/hashCode';

export function getColors(name: string | null): string[] {
  if (!name) return [];
  // eslint-disable-next-line no-nested-ternary
  return theme[name] ? theme[name] : nanocolors[name] ? [name] : [];
}

export function getHashColors(name: string): string[] {
  return theme.randoms[hashCode(name) % theme.randoms.length] || [];
}

export function hashColor(name: string, str: string): string {
  const colors = getHashColors(name);
  return colors.reduce((msg, colorName) => {
    // eslint-disable-next-line no-console
    if (!nanocolors[colorName]) console.log('!nanocolors[colorName]', { colorName });
    return nanocolors[colorName](msg);
  }, str);
}

export function color(name: string | null, str: string): string {
  const colors = getColors(name);
  return colors.reduce((msg, colorName) => {
    // eslint-disable-next-line no-console
    if (!nanocolors[colorName]) console.log('!nanocolors[colorName]', { colorName });
    return nanocolors[colorName](msg);
  }, str);
}

export default color;

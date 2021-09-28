/* eslint-disable no-nested-ternary */
import nanocolors from 'nanocolors';

import { theme } from './config';
import hashCode from './utils/hashCode';

export function getColors(name: string): string[] {
  // eslint-disable-next-line no-nested-ternary
  return theme[name] ? theme[name] : colors[name] ? [name] : [];
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

export function color(name: string, str: string): string {
  const colors = getColors(name);
  return colors.reduce((msg, colorName) => {
    // eslint-disable-next-line no-console
    if (!nanocolors[colorName]) console.log('!nanocolors[colorName]', { colorName });
    return nanocolors[colorName](msg);
  }, str);
}

export default color;

/* eslint-disable no-nested-ternary */

import { color, hashColor } from '../color';
import { env } from '../utils/env';
import { hashCode } from '../utils/hashCode';
import { leftPad } from '../utils/leftPad';

const LOG_VIEW = env('LOG_VIEW', 'short');

let prettyPathLength = 20;
export const prettyPath = (url: string, defaultUrlPad = 0) => {
  prettyPathLength = Math.max((url && url.length) || 0, prettyPathLength, defaultUrlPad);
  return leftPad(url, -prettyPathLength);
};

export const prettyStatus = (status: number) => {
  const colorName =
    status >= 500
      ? 'error'
      : status >= 400
      ? 'warn'
      : status >= 300
      ? 'debug'
      : status === 200
      ? null // eslint-disable-line
      : 'log';
  return color(colorName, leftPad(status, 3));
};
export const prettyReqId = (reqId: number) => leftPad(`#${reqId}`, 3);
export const prettyMethod = (method: string) => {
  // eslint-disable-next-line no-nested-ternary
  const colorName = method === 'REMOVE' ? 'error' : method === 'WS' ? 'debug' : null;
  return color(colorName, leftPad(method, 4));
};
export const prettyTime = (ms: number) => {
  const colorName = ms >= 10 * 1000 ? 'error' : ms >= 3 * 1000 ? 'warn' : null;

  let res: string;
  if (!ms) {
    res = '-';
  } else if (ms > 10 * 60 * 1000) {
    res = `${Math.round(ms / 60 / 1000)}m`;
  } else if (ms > 1 * 1000) {
    res = `${Math.round(ms / 1000)}s `;
  } else {
    res = `${ms.toFixed(0)}ms`;
  }
  res = leftPad(res, 5);
  return color(colorName, leftPad(res, 5));
};
export const prettySize = (bytes: number, seperator = '') => {
  const sizes = ['b', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) return '-';
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
  if (i === 0) return `${bytes}${seperator}${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
};
export const prettyNs = (names: string[]): string => names.map((name: string) => hashColor(name, name)).join(':');

export function prettyMarker(key: string): string {
  const markers = ['•', '☼', '○', '♠', '♠', '♦', '♥'];
  const marker = markers[hashCode(`2${key}`) % markers.length];
  return hashColor(key, marker);
}

export const prettyLevel = (level = ''): string => {
  let logLevelStr = LOG_VIEW === 'short' ? (level[0] || '').toLowerCase() : leftPad(level, 5);
  logLevelStr = `[${logLevelStr}]`;
  return color(level, logLevelStr);
};

export const prettyContent = (...args: any[]) => args;

export const prettyUrl = (mainArg: any, { level }: { level?: string | null } = {}) =>
  [
    prettyMethod(mainArg.method),
    prettyPath(mainArg.url),
    prettyReqId(mainArg.reqId),
    level !== 'debug' && mainArg.method !== 'WS' ? prettyStatus(mainArg.status) : null,
    level !== 'debug' && prettyTime(mainArg.duration),
    level !== 'debug' && mainArg.method !== 'WS' ? prettySize(mainArg.length) : null,
  ]
    .filter(Boolean)
    .join(' ');

// export default pretty;

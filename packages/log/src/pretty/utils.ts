/* eslint-disable no-nested-ternary */

import { color, hashColor } from '../color';
import { env } from '../utils/env';
import { hashCode } from '../utils/hashCode';
import { isFinalUrlLog, isUrlLog } from '../utils/isUrlLog';
import { leftPad } from '../utils/leftPad';

const LOG_VIEW = env('LOG_VIEW', 'short');

let prettyPathLength = 20;
export const prettyPath = (url: string, defaultUrlPad = 0) => {
  prettyPathLength = Math.max((url && url.length) || 0, prettyPathLength, defaultUrlPad);
  return leftPad(url, -prettyPathLength);
};

export const getStatusLevel = (status: number) =>
  status >= 500
    ? 'error'
    : status >= 400
    ? 'warn'
    : status >= 300
    ? 'debug'
    : // : status === 200
      //   ? null // eslint-disable-line
      // : 'log';
      null;
export const prettyStatus = (status: number) =>
  color(getStatusLevel(status) || status !== 200 ? 'log' : null, leftPad(status, 3));
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
    res = `${ms.toFixed(0)}µs`;
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

export function prettyMarker(key: string | number): string {
  // https://www.alt-codes.net/
  const markers = ['○', '•', '♠', '♠', '♦', '♥', '☼', '♂', '♀', '♪', '§'];
  const marker = markers[hashCode(key) % markers.length];
  return hashColor(key, marker);
}

export const prettyLevel = (level = ''): string => {
  let logLevelStr = LOG_VIEW === 'short' ? (level[0] || '').toLowerCase() : leftPad(level, 5);
  logLevelStr = `[${logLevelStr}]`;
  return color(level, logLevelStr);
};

export const prettyContent = (...args: any[]) => args;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUrlLevel = (req: any): string => (getStatusLevel(req.status) || isFinalUrlLog(req) ? 'trace' : 'debug');
export const prettyUrl = (req: any): string => {
  const isFinalUrl = isFinalUrlLog(req);
  const level = getUrlLevel(req); // , { level }: { level?: string | null } = {}
  return [
    prettyLevel(level),
    [prettyMarker(req.reqId), prettyMethod(req.method)].join(''),
    prettyPath(req.url),
    prettyReqId(req.reqId),
    isFinalUrl && req.method !== 'WS' ? prettyStatus(req.status) : null,
    isFinalUrl && prettyTime(req.duration),
    isFinalUrl && req.method !== 'WS' ? prettySize(req.length) : null,
    // !isFinalUrl && '[...]',
    !isFinalUrl && '⧖…⧗',
  ]
    .filter(Boolean)
    .join(' ');
};

// export default pretty;

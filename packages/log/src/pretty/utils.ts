/* eslint-disable no-nested-ternary */
import _prettyBytes from 'pretty-bytes';
import _prettyTime from 'pretty-time';

import { color, hashColor } from '../color';
import { env } from '../utils/env';
import { isLsklogWebFinal } from '../utils/formats/lsklog';
import { hashCode } from '../utils/hashCode';
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
export const prettyStatus = (status: number) => {
  let level = getStatusLevel(status);
  if (!level) level = status !== 200 ? 'log' : null;
  return color(level, leftPad(status, 3));
};
export const prettyReqId = (reqId: number) => leftPad(`#${reqId}`, 3);
export const prettyMethod = (method: string) => {
  // eslint-disable-next-line no-nested-ternary
  const colorName = method === 'REMOVE' ? 'error' : method === 'WS' ? 'debug' : null;
  return color(colorName, leftPad(method, 4));
};

export const prettyTime = (ms: number, format = '') => {
  const colorName = ms >= 10 * 1000 ? 'error' : ms >= 3 * 1000 ? 'warn' : null;
  const formats = ['m', 's', 'ms'];
  const f = formats.includes(format) ? format : '';

  const ns = Math.floor(Math.abs(ms) * 10 ** 6);
  const res = _prettyTime(ns, f);
  return color(colorName, leftPad(res, 5));
};

export const prettySize = (bytes: number, seperator = '') => {
  const [value, size] = _prettyBytes(bytes, { binary: true, maximumFractionDigits: 1 }).split(' ');

  return `${value}${seperator}${size}`;
};

export const prettyNs = (names: string[], mainName?: string | null): string => {
  // TODO: придумать когда name не очень нужен
  const a = 123; //eslint-disable-line
  return [...names, mainName]
    .filter(Boolean)
    .map((name: string) => hashColor(name, name))
    .join(':');
};

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
export const getUrlLevel = (req: any): string =>
  getStatusLevel(req.status) || isLsklogWebFinal(req) ? 'debug' : 'trace';
export const prettyUrl = (req: any): string => {
  const isFinalUrl = isLsklogWebFinal(req);
  const level = getUrlLevel(req); // , { level }: { level?: string | null } = {}
  return [
    prettyLevel(level),
    [prettyMarker(req.reqId), prettyMethod(req.method)].join(''),
    prettyPath(req.url),
    prettyReqId(req.reqId),
    isFinalUrl && req.method !== 'WS' ? prettyStatus(req.status) : null,
    !isFinalUrl && '⧗⧖⧗',
    isFinalUrl && prettyTime(req.duration),
    isFinalUrl && req.method !== 'WS' ? prettySize(req.length) : null,
    // !isFinalUrl && '[...]',
    // !isFinalUrl && '⧖…⧗',
  ]
    .filter(Boolean)
    .join(' ');
};

// export default pretty;

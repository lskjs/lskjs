/* eslint-disable no-nested-ternary */

import { ILoggerMeta } from '../types';
import { isLsklogWeb } from './formats/lsklog';
import { prettyContent, prettyLevel, prettyNs, prettyUrl } from './utils';

export function countInRow(args: any[], filter: any): number {
  let stringsLength = 0;
  args.forEach((a, pos) => {
    if (pos !== stringsLength) return;
    if (filter(a)) stringsLength += 1;
  });
  return stringsLength;
}

export function concatFirstStrings(...args: any[]): string[] {
  const stringsCount = countInRow(args, (a: any) => typeof a === 'string');

  return [args.slice(0, stringsCount).join(' '), ...args.slice(stringsCount)];
}

export function prettyFormat(meta: ILoggerMeta, ...args: any[]): string[] {
  const ns = meta?.ns;
  const name = meta?.name;
  const level = meta?.level || 'log';
  // const [mainArg] = args;
  const logArgs = args;
  if (isLsklogWeb(meta)) {
    return [prettyUrl(meta)];
  }
  const names: string[] = (ns || '').split(':').filter(Boolean).map(String);
  const prefix = [prettyLevel(level)];
  if (names.length || name) {
    prefix.push(prettyNs(names, name));
  }
  return concatFirstStrings(...prefix, ...prettyContent(...logArgs));
}

export default prettyFormat;

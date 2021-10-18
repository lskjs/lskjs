/* eslint-disable no-nested-ternary */

import { ILogger } from '../types';
import { isUrlLog } from '../utils/isUrlLog';
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

export function prettyFormat(log: ILogger, ...args: any[]): string[] {
  const [mainArg] = args;
  const logArgs = mainArg.data || args;
  if (isUrlLog(mainArg)) {
    return [prettyUrl(mainArg)];
  }
  const names: string[] = (log.ns || '').split(':').filter(Boolean).map(String);
  return concatFirstStrings(prettyLevel(mainArg.level), prettyNs(names, log.name), ...prettyContent(...logArgs));
}

export default prettyFormat;

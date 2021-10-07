/* eslint-disable no-nested-ternary */

import { ILogger } from '../types';
import { isUrlLog, prettyContent, prettyLevel, prettyNs, prettyUrl } from './utils';

export function prettyFormat(log: ILogger, ...args: any[]): string[] {
  const [mainArg] = args;
  if (isUrlLog(mainArg)) {
    return [prettyUrl(mainArg, { level: log.level })];
  }
  const names: string[] = [...(log.ns || []), log.name].filter(Boolean).map(String);
  return [prettyLevel(mainArg.level), prettyNs(names), ...prettyContent(...args)];
}

export default prettyFormat;

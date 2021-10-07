/* eslint-disable no-nested-ternary */

import { ILogger } from '../types';
import { isUrlLog } from '../utils/isUrlLog';
import { prettyContent, prettyLevel, prettyNs, prettyUrl } from './utils';

export function prettyFormat(log: ILogger, ...args: any[]): string[] {
  const [mainArg] = args;
  const logArgs = mainArg.data || args;
  if (isUrlLog(mainArg)) {
    return [prettyUrl(mainArg, { level: log.level })];
  }
  const names: string[] = [...(log.ns || '').split(':'), log.name].filter(Boolean).map(String);
  return [prettyLevel(mainArg.level), prettyNs(names), ...prettyContent(...logArgs)];
}

export default prettyFormat;

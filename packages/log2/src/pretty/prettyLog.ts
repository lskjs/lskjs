/* eslint-disable no-nested-ternary */

import { isUrlLog, prettyContent, prettyLevel, prettyNs, prettyUrl } from './utils';

export function prettyFormat(log: Logger, ...args: any[]): void {
  const [mainArg] = args;
  if (isUrlLog(mainArg)) {
    return [prettyUrl(mainArg, { level })];
  }
  const names = [...(log.ns || []), log.name].filter(Boolean);
  return [prettyLevel(mainArg.level), prettyNs(names), ...prettyContent(...args)];
}

export function prettyLog(log: Logger, ...args: any[]): void {
  return log.__logger(...prettyFormat(log, ...args));
}

export default prettyLog;

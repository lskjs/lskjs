// https://github.com/sirupsen/logrus
// {"level":"warning","msg":"The group's number increased tremendously!", "number":122,"omg":true,"time":"2014-03-10 19:57:38.562471297 -0400 EDT"}

import { ILoggerInternalMessageFormat } from '../..';
import { ILoggerInternalMessage, LoggerLevelType } from '../../types';
import { toString } from '../../utils/toString';
import { parseArgs } from './utils';

type LogrusLevel = 'trace' | 'debug' | 'info' | 'warning' | 'error' | 'fatal' | 'panic';

export const logrusLevels: LogrusLevel[] = [
  'trace',
  'debug',
  'info',
  'warning',
  'error',
  'fatal',
  'panic',
];
const logrusToLskLevels: Record<LogrusLevel, LoggerLevelType> = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warning: 'warn',
  error: 'error',
  fatal: 'fatal',
  panic: 'fatal',
};
const lskToLogrusLevels: Record<LoggerLevelType, LogrusLevel> = {
  log: 'trace',
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warning',
  error: 'error',
  fatal: 'fatal',
};

export const isLogrus = (json: any): boolean =>
  Boolean(json.msg && logrusLevels.includes(json.level));
// export const isLogrus = (json: any): boolean => Boolean(json.msg && json.time && logrusLevels.includes(json.level));

export const parseLogrus = (json: any): ILoggerInternalMessage => {
  const { level, time, msg, ...data } = json;
  return {
    format: ILoggerInternalMessageFormat.logrus,
    meta: {
      level: logrusToLskLevels[level as LogrusLevel],
      time: new Date(time),
    },
    args: parseArgs(msg, data),
  };
};
export const stringifyLogrus = (json: any): string => {
  const { level, time, ...props } = json;
  return toString({
    level: lskToLogrusLevels[level as LoggerLevelType],
    time: time.toISOString(),
    ...props,
  });
};

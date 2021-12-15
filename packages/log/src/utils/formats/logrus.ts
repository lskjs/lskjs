// https://github.com/sirupsen/logrus
// {"level":"warning","msg":"The group's number increased tremendously!", "number":122,"omg":true,"time":"2014-03-10 19:57:38.562471297 -0400 EDT"}
import { ILoggerInternalMessage } from '../../types';
import { toString } from '../toString';
import { parseArgs } from './utils';

export const logrusLevels = ['trace', 'debug', 'info', 'warning', 'error', 'fatal', 'panic'];

export const isLogrus = (json: any): boolean => Boolean(json.msg && logrusLevels.includes(json.level));
// export const isLogrus = (json: any): boolean => Boolean(json.msg && json.time && logrusLevels.includes(json.level));

export const parseLogrus = (json: any): ILoggerInternalMessage => {
  const { level, time, msg, ...data } = json;
  const levelMap = {
    trace: 'trace',
    debug: 'debug',
    info: 'info',
    warning: 'warn',
    error: 'error',
    fatal: 'fatal',
    panic: 'panic',
  };
  return {
    meta: {
      level: levelMap[level],
      time: new Date(time),
    },
    args: parseArgs(msg, data),
  };
};
export const stringifyLogrus = (json: any): string => {
  const { level, time, ...props } = json;
  const levelMap = {
    trace: 'trace',
    debug: 'debug',
    info: 'info',
    warn: 'warning',
    error: 'error',
    fatal: 'fatal',
    panic: 'panic',
  };
  return toString({
    level: levelMap[level],
    time: time.toISOString(),
    ...props,
  });
};

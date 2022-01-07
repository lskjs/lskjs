// https://github.com/trentm/node-bunyan
// {"name":"myapp","hostname":"banana.local","pid":40161,"level":30,"msg":"hi","time":"2013-01-04T18:46:23.851Z","v":0}

import { ILoggerInternalMessageFormat } from '../..';
import { ILoggerInternalMessage } from '../../types';
import { toString } from '../toString';
import { parseArgs } from './utils';

export const isBunyan = (json: any): boolean =>
  Boolean(json.name && json.hostname && json.pid && json.msg && json.time);
export const parseBunyan = (json: any): ILoggerInternalMessage => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { level, time, msg, hostname, pid, v, ...data } = json;
  const levelMap = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
  };
  return {
    format: ILoggerInternalMessageFormat.bunyan,
    meta: {
      level: levelMap[level],
      time: new Date(time),
      // hostname,
      // pid,
      // v,
    },
    args: parseArgs(msg, data),
  };
};

export const stringifyBunyan = (json: any): string => {
  const { level, time, ...props } = json;
  const levelMap = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  };
  return toString({
    level: levelMap[level],
    time: time.toISOString(),
    ...props,
  });
  // if (logFormat === 'bunyan') {
  //   data.level = levelsPriority[level];
  // } else {
  //   data.level = level;
  // }
  // if (logFormat === 'bunyan' || logFormat === 'logrus') {
  //   data.time = time.toISOString();
  // } else {
  //   data.time = +time;
  // }
};

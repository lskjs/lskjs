// https://github.com/sirupsen/logrus
// {"level":"info","time":1639528619417,"ns":"lsk:rabbit","msg":"[watch] finished 4092654"}
// {"time":null,"reqId":"2srlW-ycUSEJyQE8U8tZk","method":"GET","host":"buzzguru.com","url":"/youtube/channels/5b686e12aeb42f00176245de/products/5ebe7d93ff9c79dc14a1664c","ua":"Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)","ip":"95.108.213.58, 10.101.3.140","status":200,"length":115268,"duration":1287.031414}

import { ILoggerInternalMessageFormat } from '../..';
import { ILoggerInternalMessage } from '../../types';
import { toString } from '../../utils/toString';
import { parseArgs } from './utils';

export const lsklogLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
export const lsklogWebLevels = [
  'reqId',
  'method',
  'host',
  'ua',
  'ip',
  'url',
  'status',
  'length',
  'duration',
];

export const isLsklog = (json: any): boolean =>
  Boolean(lsklogLevels.includes(json.level) && json.ns);
export const isLskLikelog = (json: any): boolean => Boolean(lsklogLevels.includes(json.level));

export const isLsklogWeb = (req: any): boolean =>
  Boolean(req && (req.name === 'req' || (req.method && req.host && req.url))); // reqId
export const isLsklogWebFinal = (req: any): boolean =>
  Boolean(isLsklogWeb(req) && (req.status || req.duration || req.length));

export const parseLsklog = (json: any): ILoggerInternalMessage => {
  // console.log('parseLsklog', { ns });
  const { level, time, msg, ns, name, ...data } = json;
  const meta = {
    level,
    time,
    msg,
    ns,
    name,
  };
  if (!isLsklogWeb(json)) {
    return {
      format: ILoggerInternalMessageFormat.lsklogweb,
      meta,
      args: parseArgs(msg, data),
    };
  }
  const { reqId, method, host, ua, ip, url, status, length, duration, ...data2 } = data;
  return {
    format: ILoggerInternalMessageFormat.lsklog,
    meta: {
      ...meta,
      method,
      host,
      reqId,
      ua,
      ip,
      url,
      status,
      duration,
      length,
    },
    args: parseArgs(msg, data2),
  };
};

export const stringifyLsklog = (json: any): string => {
  const { level, time, ...props } = json;
  return toString({
    level,
    time: +time,
    ...props,
  });
};

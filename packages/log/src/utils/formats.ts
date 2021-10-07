// https://github.com/trentm/node-bunyan
// {"name":"myapp","hostname":"banana.local","pid":40161,"level":30,"msg":"hi","time":"2013-01-04T18:46:23.851Z","v":0}
export const isBunyan = (json: any): boolean =>
  json.name && json.hostname && json.pid && json.msg && json.time && json.v;

export const parseBunyan = (json: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { level, time, msg, hostname, pid, v, ...props } = json;
  const levelMap = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
  };
  return {
    level: levelMap[level],
    time: new Date(time),
    msg,
    ...props,
  };
};

export const stringifyLogrus = (json: any): any => {
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
  return {
    level: levelMap[level],
    time: time.toISOString(),
    ...props,
  };
};

export const stringifyLsk = (json: any): any => {
  const { level, time, ...props } = json;
  return {
    level,
    time: +time,
    ...props,
  };
};

export const stringifyBunyan = (json: any): any => {
  const { level, time, ...props } = json;
  const levelMap = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  };
  return {
    level: levelMap[level],
    time: time.toISOString(),
    ...props,
  };
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

// https://github.com/sirupsen/logrus
// {"level":"warning","msg":"The group's number increased tremendously!", "number":122,"omg":true,"time":"2014-03-10 19:57:38.562471297 -0400 EDT"}
export const isLogrus = (json: any): boolean =>
  json.msg &&
  json.time &&
  json.level &&
  ['trace', 'debug', 'info', 'warning', 'error', 'fatal', 'panic'].includes(json.level);

export const parseLogrus = (json: any): any => {
  const { level, time, msg, ...props } = json;
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
    level: levelMap[level],
    time: new Date(time),
    msg,
    ...props,
  };
};

// https://github.com/sirupsen/logrus
// {"level":"warning","msg":"The group's number increased tremendously!", "number":122,"omg":true,"time":"2014-03-10 19:57:38.562471297 -0400 EDT"}
export const isLsk = (json: any): boolean => json.level && json.name && json.ns;

export const parseLsk = (json: any): any => {
  const { level, time, msg, ...props } = json;
  return {
    level,
    time,
    msg,
    ...props,
  };
};

export function stringify(format: string, ...args: any[]): any[] {
  // @ts-ignore
  if (format === 'bunyan') return stringifyBunyan(...args);
  // @ts-ignore
  if (format === 'logrus') return stringifyLogrus(...args);
  // @ts-ignore
  return stringifyLsk(...args);
}

export function parse(json: any): any[] {
  if (isBunyan(json)) return [parseBunyan(json)];
  if (isLsk(json)) return [parseLsk(json)];
  if (isLogrus(json)) return [parseLogrus(json)];
  return [json];
}

export default parse;

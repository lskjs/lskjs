/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import Err from '@lskjs/err';
import axios from 'axios';

// const clogs = {
//   _default: console.log,
//   trace: console.log,
//   log: console.log,
//   warn: console.warn,
//   error: console.error,
// };

const statuses = {
  _default: '',
  trace: '🗯',
  log: '🗯',
  start: '🕑',
  success: '✅',
  warn: '❗️',
  error: '❌',
  fatal: '⛔️',
};

const checkLimit = (stat, limit, size) => {
  // console.log(Date.now());
  // console.log(+(stat.startedAt || 0) + size);

  if (Date.now() > +(stat.startedAt || 0) + size) {
    // console.log('RESET');
    stat.startedAt = Date.now();
    stat.ignore = 0;
    stat.count = 0;
  }

  if (stat.count > limit) {
    // console.log('stat.count', stat.count);
    // console.log('limit', limit);
    // console.log('stat.ignore', stat.ignore);
    stat.ignore += 1;
    return false;
  }
  stat.count += 1;
  return true;
};

const checkLimits = (stats, limits) => {
  const sizes = {
    sum: 1000 * 60 * 60 * 1000,
    '1hour': 60 * 60 * 1000,
    '5min': 5 * 60 * 1000,
    '1min': 60 * 1000,
    '10sec': 10 * 1000,
  };

  const checks = Object.keys(sizes)
    .reverse()
    .map((name) => {
      const size = sizes[name];
      if (!stats[name]) stats[name] = {};
      return checkLimit(stats[name], limits[name], size);
    });

  // console.log({ checks });

  return checks.every(Boolean);

  // if (!this.stats.last.startedAt) {
  //   this.stats.last.startedAt = new Date();
  //   this.stats.last.count = (this.stats.last.count || 0) + 1;
  // }
};

// function addHash(tag) {
//   if (['#', '@'].includes(tag[0])) {
//   }
// }

export class Rlog {
  base = '';
  prefix = '';
  project = '';
  secret = null;
  // clogs = clogs;
  statuses = statuses;

  limits = {
    sum: 9999999999,
    '1hour': 300,
    '5min': 60,
    '1min': 30,
    '10sec': 10,
  };
  stats = {};

  constructor(params = {}) {
    Object.assign(this, params);
  }

  async __log(action, text, params = {}) {
    const base = params.base || this.base;
    const project = params.project || this.project;
    const secret = params.secret || this.secret;
    const prefix = params.prefix || this.prefix;
    const limits = params.limits || this.limits;
    // const clog = clogs[action] || clogs._default;
    const status = statuses[action] || statuses._default;

    if (!(params.force || params.ignoreLimits) && !checkLimits(this.stats, limits)) {
      if (this.log && this.log.warn) this.log.warn('[Rlog] IGNORE BY LIMITS');
      return null;
    }

    const tags = (params.tags || []).map((t) => (['#', '@'].includes(t[0]) ? '' : `#${t}`)).join(' ');
    const errText = params.err;

    const md = `${status}  ${prefix} ${[text, errText].filter((a) => a).join('\n')}\n\n${tags}`.trim();
    if (this.log) {
      if (this.log[action]) {
        this.log[action](md);
      } else {
        this.log.trace(md);
      }
    }

    const url = [base, project].filter(Boolean).join('/');
    // console.log({this: this}, url)
    // console.log({url});

    return axios
      .post(url, {
        secret,
        action,
        status,
        text: md,
        tags: params.tags,
      })
      .catch((err) => {
        if (this.log && this.log.error) {
          this.log.error(`[${action}]`, Err.getCode(err));
        } else {
          console.error(`Rlog [${action}]`, Err.getCode(err));
        }
        return null;
      });
  }
  trace(...args) {
    return this.__log('trace', ...args);
  }
  start(...args) {
    return this.__log('start', ...args);
  }
  success(...args) {
    return this.__log('success', ...args);
  }
  warn(...args) {
    return this.__log('warn', ...args);
  }
  error(...args) {
    return this.__log('error', ...args);
  }
  fatal(...args) {
    return this.__log('fatal', ...args);
  }
  // __noSuchMethod__(method, args) {
  //   return this.send(method, ...args);
  // }
}

// Object.keys(statuses).forEach((status) => {
//   Rlog[status] = function _send(...args) { this.send(status, ...args); };
// });

export default Rlog;

/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const clogs = {
  _default: console.log,
  trace: console.log,
  log: console.log,
  warn: console.warn,
  error: console.error,
};

const statuses = {
  _default: '❔',
  trace: '🗯',
  log: '🗯',
  start: '🕑',
  success: '✅',
  warn: '❗️',
  error: '❌',
  fatal: '⛔️',
};

const checkLimit = (stat, limit, size) => {
  if (new Date() > (stat.startedAt || 0) + size) {
    stat.startedAt = new Date();
    stat.ignore = 0;
    stat.count = 0;
  }
  if (stat.count > limit) {
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

  return Object.keys(sizes)
    .reverse()
    .every(name => {
      const size = sizes[name];
      if (!stats[name]) stats[name] = {};
      return checkLimit(stats[name], limits[name], size);
    })
    .every(Boolean);

  // if (!this.stats.last.startedAt) {
  //   this.stats.last.startedAt = new Date();
  //   this.stats.last.count = (this.stats.last.count || 0) + 1;
  // }
};

// function addHash(tag) {
//   if (['#', '@'].includes(tag[0])) {
//   }
// }

class Rlog {
  base = '';
  prefix = '';
  project = '';
  secret = null;
  clogs = clogs;
  statuses = statuses;

  limits = {
    sum: null,
    '1hour': 300,
    '5min': 60,
    '1min': 30,
    '10sec': 10,
  };
  stats = {};

  constructor(params = {}) {
    Object.assign(this, params);
  }

  async send(action, text, params = {}) {
    const prefix = params.prefix || this.prefix;
    const secret = params.secret || this.secret;
    const limits = params.limits || this.limits;
    const clog = clogs[action] || clogs._default;
    const status = statuses[action] || statuses._default;

    if (!checkLimits(this.stats, limits)) {
      console.error('Rlog.send: IGNORE BY LIMITS');
      return null;
    }

    const tags = (params.tags || []).map(t => (['#', '@'].includes(t[0]) ? '' : `#${t}`)).join(' ');
    const errText = params.err;

    const md = `${status}  ${prefix} ${[text, errText].filter(a => a).join('\n')}\n\n${tags}`.trim();
    clog(md);

    const url = [this.base, this.project].join('/');
    // console.log({url});

    return axios
      .post(url, {
        secret,
        action,
        status,
        text: md,
        tags: params.tags,
      })
      .catch(err => {
        console.error(`Rlog.${action} error: ${String(err.code)}`);
        return null;
      });
  }
  trace = (...args) => this.send('trace', ...args);
  log = (...args) => this.send('log', ...args);
  start = (...args) => this.send('start', ...args);
  success = (...args) => this.send('success', ...args);
  warn = (...args) => this.send('warn', ...args);
  error = (...args) => this.send('error', ...args);
  fatal = (...args) => this.send('fatal', ...args);
  // __noSuchMethod__(method, args) {
  //   return this.send(method, ...args);
  // }
}

// Object.keys(statuses).forEach((status) => {
//   Rlog[status] = function _send(...args) { this.send(status, ...args); };
// });

export default Rlog;

import axios from 'axios';

const clogs = {
  _default: console.log, // eslint-disable-line no-console
  trace: console.log, // eslint-disable-line no-console
  log: console.log, // eslint-disable-line no-console
  warn: console.warn, // eslint-disable-line no-console
  error: console.error, // eslint-disable-line no-console
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
class Logger {
  base = '';
  prefix = '';
  project = '';
  clogs = clogs;
  statuses = statuses;

  constructor(params = {}) {
    Object.assign(this, params);
  }

  send(action, text, ...params) {
    const { prefix } = this;
    const clog = clogs[action] || clogs._default;
    const status = statuses[action] || statuses._default;
    // function addHash(tag) {
    //   if (['#', '@'].includes(tag[0])) {

    //   }
    // }
    const tags = (params.tags || []).map((t) => (['#', '@'].includes(t[0]) ? '' : `#${t}`)).join(' ');
    const errText = params.err;

    const md = `${status}  ${prefix} ${[text, errText].filter((a) => a).join('\n')}\n\n${tags}`.trim();
    clog(md);

    const url = [this.base, this.project].join('/');

    return axios
      .post(url, {
        action,
        status,
        text: md,
        tags: params.tags,
      })
      .catch((err) => {
        console.log(`Logger.${action} error`, err); // eslint-disable-line no-console
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
//   Logger[status] = function _send(...args) { this.send(status, ...args); };
// });

export default Logger;

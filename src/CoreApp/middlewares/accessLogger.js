import _ from 'lodash';
const cache = [
  '',
  ' ',
  '  ',
  '   ',
  '    ',
  '     ',
  '      ',
  '       ',
  '        ',
  '         ',
];

function leftPad(str, len, ch) {
  // convert `str` to `string`
  str = `${str}`;
  // `len` is the `pad`'s length now
  //
  let reverse = 0;
  if (len < 0) {
    len *= -1;
    reverse = 1;
  }
  len -= str.length;
  // doesn't need to pad
  if (len <= 0) return str;
  // `ch` defaults to `' '`
  if (!ch && ch !== 0) ch = ' ';
  // convert `ch` to `string`
  ch = `${ch}`;
  // cache common use cases
  if (ch === ' ' && len < 10) return reverse ? str + cache[len] : cache[len] + str;
  // `pad` starts with an empty string
  let pad = '';
  // loop
  while (true) {
    // add `ch` to `pad` if `len` is odd
    if (len & 1) pad += ch;
    // divide `len` by 2, ditch the remainder
    len >>= 1;
    // "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
    if (len) ch += ch;
    // `len` is 0, exit the loop
    else break;
  }
  // pad `str`!

  return reverse ? str + pad : pad + str;
}

// "asd \x1b[41m \e[0;34m asdas" +

function levelFn(data) {
  if (data.err || data.status >= 500 || data.duration > 10000) { // server internal error or error
    return 'error';
  } else if (data.status >= 400 || data.duration > 3000) { // client error
    return 'warn';
  }
  return 'info';
}

const urlPad = -20;

function logStart(data) {
  return `${leftPad(data.method, 4)} ${leftPad(data.url, urlPad)} #${data.reqId}`;// + '\x1b[33mYAUEBAN\x1b[0m AZAZA'
}

function logFinish(data) {
  const time = (data.duration || 0).toFixed(3);
  const method = leftPad(data.method, 4);
  const length = data.length || 0;
  return `${method} ${leftPad(data.url, urlPad)} #${data.reqId} ${leftPad(data.status, 3)} ${leftPad(time, 7)}ms ${length}b `;
}

export default (ctx) => {
  if (!_.has(ctx, 'config.middlewares.accessLogger')) return null;
  return (req, res, next) => {
    const data = {};
    const log = req.log.child({
      component: 'req',
    });

    data.reqId = req.reqId;
    data.method = req.method;
    if (req.ws) data.method = 'WS';
    data.host = req.headers.host;
    data.url = (req.baseUrl || '') + (req.url || '-');
    data.referer = req.header('referer') || req.header('referrer');
    data.ua = req.header('user-agent');
    data.ip = req.ip || req.connection.remoteAddress ||
        (req.socket && req.socket.remoteAddress) ||
        (req.socket.socket && req.socket.socket.remoteAddress) ||
        '127.0.0.1';

    if (__DEV__) {
      log.debug(data, logStart(data));
      if (req.body) {
        log.trace(JSON.stringify(req.body));
      }
    }

    const hrtime = process.hrtime();
    function logging() {
      data.status = res.statusCode;
      data.length = res.getHeader('Content-Length');

      const diff = process.hrtime(hrtime);
      data.duration = diff[0] * 1e3 + diff[1] * 1e-6;

      log[levelFn(data)](data, logFinish(data));
    }
    res.on('finish', logging);
    res.on('close', logging);
    next();
  };
};

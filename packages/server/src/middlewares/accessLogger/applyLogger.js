import omit from 'lodash/omit';
import leftPad from '@lskjs/utils/leftPad';
import Log from '@lskjs/log2';
import getReqIp from '../../helpers/getReqIp';

const log2 = new Log({ name: 'req' });

export function levelFn(data, status) {
  if (data.method === 'WS') {
    if (status === 'start') {
      return 'info';
    }
    if (status === 'finish') {
      return 'debug';
    }
  }
  if (status === 'start') {
    return 'debug';
  }
  if (data.err || data.status >= 500 || data.duration > 10000) {
    // server internal error or error
    return 'error';
  }
  if (data.status >= 400 || data.duration > 3000) {
    // client error
    return 'warn';
  }
  return 'info';
}

const urlPad = -20;

export function logStart(data) {
  return `${leftPad(data.method, 4)} ${leftPad(data.url, urlPad)} #${data.reqId}`; // + '\x1b[33mYAUEBAN\x1b[0m AZAZA'
}

export function logFinish(data) {
  const time = (data.duration || 0).toFixed(3);
  const method = leftPad(data.method, 4);
  const length = data.length || 0;
  if (data.method === 'WS') {
    return `${method} ${leftPad(data.url, urlPad)} #${data.reqId} ${leftPad(time, 7)}ms `;
  }
  return `${method} ${leftPad(data.url, urlPad)} #${data.reqId} ${leftPad(data.status, 3)} ${leftPad(
    time,
    7,
  )}ms ${length}b `;
}

export function applyLogger(req, res) {
  const data = {};
  const { log = log2 } = req;

  data.reqId = req.reqId;
  data.method = req.method;
  if (req.ws) data.method = 'WS';
  if (req._direct) data.method = `#${data.method}`;
  data.host = req.headers.host;
  if (req.ws) {
    data.url = `${req.ws.nsp.name} ${JSON.stringify(omit(req.data, ['EIO', 'transport', 'token']))}`;
  } else {
    data.url = (req.baseUrl || '') + (req.url || '-');
  }
  data.referer = req.header('referer') || req.header('referrer');
  data.ua = req.header('user-agent');
  data.ip = getReqIp(req) || '127.0.0.1';

  if (__DEV__) {
    log[levelFn(data, 'start')](data, logStart(data));
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

    log[levelFn(data, 'finish')](data, logFinish(data));
  }
  res.on('close', logging);
}

export default applyLogger;

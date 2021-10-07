import Log from '@lskjs/log';
import { isDev } from '@lskjs/utils/env';
// import leftPad from '@lskjs/utils/leftPad';
import omit from 'lodash/omit';

import { getReqIp } from '../../helpers/getReqIp';

const log2 = new Log({ name: 'req' }); // TODO: подумать нужно ли создавать или надо наследоваться

export function levelFn(data, status) {
  if (data.method === 'WS') {
    if (status === 'start') {
      return 'debug';
    }
    if (status === 'finish') {
      return 'trace';
    }
  }
  if (status === 'start') {
    return 'trace';
  }
  if (data.err || data.status >= 500 || data.duration > 10000) {
    // server internal error or error
    return 'error';
  }
  if (data.status >= 400 || data.duration > 3000) {
    // client error
    return 'warn';
  }
  return 'debug';
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
  data.ip = getReqIp(req);

  let startLogger;
  if (isDev) {
    startLogger = setTimeout(() => {
      const args = [data];
      if (req.body && Object.keys(req.body).length) {
        args.push(req.body);
      }
      log[levelFn(data, 'start')](...args);
    }, 1500);
  }

  const hrtime = process.hrtime();
  function logging() {
    clearTimeout(startLogger);
    data.status = res.statusCode;
    data.length = +res.getHeader('Content-Length');

    const diff = process.hrtime(hrtime);
    data.duration = diff[0] * 1e3 + diff[1] * 1e-6;

    log[levelFn(data, 'finish')](data);
  }
  res.on('close', logging);
}

export default applyLogger;

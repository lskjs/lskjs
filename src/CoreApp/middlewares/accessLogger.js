import leftPad from 'left-pad'

function levelFn(data) {
  if (data.err || data.status >= 500 || data.duration > 10000) { // server internal error or error
    return 'error';
  } else if (data.status >= 400 || data.duration > 3000) { // client error
    return 'warn';
  }
  return 'info';
}

function logStart(data) {
  return `${leftPad(data.method, 4)} ${data.url} started reqId=${data.reqId}`// + '\x1b[33mYAUEBAN\x1b[0m AZAZA'
}

function logFinish(data) {
  const time = (data.duration || 0).toFixed(3)
  const method = leftPad(data.method, 4)
  const length = data.length || 0
  return `${method} ${data.url} ${leftPad(data.status, 3)} ${leftPad(time, 7)}ms ${leftPad(length, 5)}b reqId=${data.reqId}`
}

export default (ctx) => ([
  (req, res, next) => {
    const data = {}
    const log = req.log.child({
      component: 'req',
    });

    data.reqId = req.reqId
    data.method = req.method
    if (req.ws) data.method = 'WS'
    data.host = req.headers.host
    data.url = (req.baseUrl || '') + (req.url || '-')
    data.referer = req.header('referer') || req.header('referrer')
    data.ua = req.header('user-agent')
    data.ip = req.ip || req.connection.remoteAddress ||
        (req.socket && req.socket.remoteAddress) ||
        (req.socket.socket && req.socket.socket.remoteAddress) ||
        '127.0.0.1'

    if (__DEV__) {
      log.debug(data, logStart(data));
      if (req.body) {
        log.trace(JSON.stringify(req.body));
      }
    }

    const hrtime = process.hrtime();
    function logging() {
      data.status = res.statusCode
      data.length = res.getHeader('Content-Length')

      const diff = process.hrtime(hrtime);
      data.duration = diff[0] * 1e3 + diff[1] * 1e-6

      log[levelFn(data)](data, logFinish(data));
    }
    res.on('finish', logging);
    res.on('close', logging);
    next();
  }
])

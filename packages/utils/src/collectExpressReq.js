import pick from 'lodash/pick';

export default initReq => {
  const formattedUrl = require('url').format({
    protocol: initReq.protocol,
    host: initReq.get('host'),
    pathname: initReq.originalUrl,
  });
  const req = pick(formattedUrl, ['href', 'protocol', 'hostname', 'port', 'pathname', 'hash', 'search']);
  req.query = initReq.query;
  req.xhr = initReq.xhr;
  req.ip = initReq.ip;
  req.cookies = initReq.cookies;
  return req;
};

// pick(initReq, ['hostname', 'originalUrl', 'path', 'query', 'ip', 'cookies', 'protocol', 'xhr']);

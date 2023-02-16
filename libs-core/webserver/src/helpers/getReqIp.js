import get from 'lodash/get';

export function isLocalhost(ip) {
  return typeof ip === 'string' && (ip.includes('127.0.0.1') || ['127.0.0.1', '::ffff:127.0.0.1', '::1'].includes(ip));
}

export function getReqIp(initReq) {
  const req = initReq || this;

  let ip =
    get(req, 'headers.x-forwarded-for') ||
    get(req, 'connection.remoteAddress') ||
    get(req, 'socket.remoteAddress') ||
    get(req, 'socket.socket.remoteAddress') ||
    get(req, 'ip') ||
    null;

  if (Array.isArray(ip)) ip = ip.join(',');

  // if (isLocalhost(ip)) {
  //   ip = 'localhost';
  // }
  return ip;
}

export default getReqIp;

/* eslint-disable no-param-reassign */
import { isClient } from '@lskjs/env';
import isAbsoluteExternalUrl from '@lskjs/utils/isAbsoluteExternalUrl';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import get from 'lodash/get';

function getIp(config) {
  // TODO: когда нибудь придумать как сделать получше @isuvorov
  const { req } = get(config, '__parent.__parent') || {};
  const ip = get(req, 'headers.x-forwarded-for') || get(req, 'socket.remoteAddress') || get(req, 'ip');
  if (!ip) {
    console.error('!!uapp.ApiModule.adapter.getIp', { ip }, req);
    return '127.0.0.1';
  }
  if (typeof ip === 'string' && ip.includes('127.0.0.1')) return '127.0.0.1';
  if (['127.0.0.1', '::ffff:127.0.0.1', '::1'].includes(ip)) return '127.0.0.1';
  return ip;
}


const getIp = (req) => {
  const ip = (req.headers && req.headers['x-forwarded-for']) || (req.socket && req.socket.remoteAddress) || req.ip;
  if (typeof ip === 'string' && ip.includes('127.0.0.1')) return '127.0.0.1';
  if (['127.0.0.1', '::ffff:127.0.0.1', '::1'].includes(ip)) return '127.0.0.1';
  if (!ip) {
    console.log('getIp!!!', { ip }, req);
    return '127.0.0.1';
  }
  return ip;
};



export async function adapter(config) {
  // console.log('adapter FETCH START', config);
  const path = [config.baseURL, config.url].filter(Boolean).join('');
  if (isAbsoluteExternalUrl(path) || isClient) return this.request(config);
  // TODO: get port from backend
  const port = 8080; // this.app.app.httpInstance.address().port
  const url = `http://localhost:${port}${path}`;

  const method = config.method.toUpperCase();

  // const { body = {}, method = 'GET', qs = {} } = options;

  // config.headers.Authorization;
  const { data: body } = config;
  const req = {
    ip: getIp(config),
    url,
    path,
    method,
    headers: config.headers,
  };
  if (body) {
    req.body = req;
    req.data = tryJSONparse(body);
  }

  // console.log('adapter FETCH ', req);
  // console.log('this.app.name', this.app.name)
  const serverApp = this.app;
  const webserver = await serverApp.module('webserver');
  const res = await webserver.expressResolve(req);
  return {
    ...res,
    config,
  };
}

export default adapter;

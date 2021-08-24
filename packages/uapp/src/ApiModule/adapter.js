/* eslint-disable no-param-reassign */
import { isClient } from '@lskjs/env';
import isAbsoluteExternalUrl from '@lskjs/utils/isAbsoluteExternalUrl';

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

  const req = {
    url,
    path,
    method,
    data: JSON.parse(config.data),
    body: config.data,
    // body: method === 'POST' ? body : qs,
    headers: config.headers,
  };
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

/* eslint-disable no-param-reassign */
import { isClient } from '@lskjs/env';
import isAbsoluteExternalUrl from '@lskjs/utils/isAbsoluteExternalUrl';

export async function fetch(...args) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const { client: axios } = this;
  const { authToken } = axios;
  const [rawUrl, options = {}] = args;
  if (isAbsoluteExternalUrl(rawUrl) || isClient) return this.request(...args);
  // TODO: get port from backend
  // if (isClient) return axios.remoteFetch(...args);
  // TODO: сделать как-нибудь по нормальному и проверенно
  const port = 8080; // this.app.app.httpInstance.address().port
  const url = `http://localhost:${port}${rawUrl}`;

  const { body = {}, method = 'GET', qs = {} } = options;
  console.log('FETCH FETCH ', this.client.baseURL, this.client.defaults.baseURL, this.client)
  const req = {
    url,
    path: [this.client && this.client.baseURL, rawUrl].filter(Boolean).join('/'),
    method,
    body: method === 'POST' ? body : qs,
    headers: authToken
      ? {
          authorization: `Bearer ${authToken}`,
        }
      : {},
    token: authToken,
  };
  if (this.debug) this.log.debug('[fetch]', method, url); 
  // const serverApp = this.app;
  const serverApp = this.app.app;
  // if (serverApp.name !== 'ReactAppServer') throw
  console.log('req', req);
  const webserver = await serverApp.module('webserver');
  return { // NOTE: оборачиваем как ответ аксиоса
    req,
    data: await webserver.expressResolve(req),
  };
  // return this.app.resolve(props);
}

export default fetch;

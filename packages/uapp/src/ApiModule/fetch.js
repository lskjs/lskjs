/* eslint-disable no-param-reassign */
import { isClient } from '@lskjs/env';
import isAbsoluteExternalUrl from '@lskjs/utils/isAbsoluteExternalUrl';

export function fetch(...args) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const { client: axios } = this;
  const { authToken } = axios;
  const [rawUrl, options = {}] = args;
  if (isAbsoluteExternalUrl(rawUrl) || isClient) return axios.request(...args);
  // TODO: get port from backend
  // if (isClient) return axios.remoteFetch(...args);
  // TODO: сделать как-нибудь по нормальному и проверенно
  const port = 8080; // this.app.app.httpInstance.address().port
  const url = `http://localhost:${port}${rawUrl}`;

  const { body = {}, method = 'GET', qs = {} } = options;
  const props = {
    url,
    method,
    body: method === 'POST' ? body : qs,
    headers: authToken
      ? {
          authorization: `Bearer ${authToken}`,
        }
      : {},
    token: authToken,
  };
  if (this.debug) this.log.debug('[fetch]', method, url); // eslint-disable-line no-console
  return this.app.resolve(props);
}

export default fetch;

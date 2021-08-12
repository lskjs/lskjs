import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import retry from '@lskjs/utils/retry';
import axios from 'axios';

import { ProxyManager } from './ProxyManager';
import { parseProxyParam } from './utils/parseProxyParam';

let proxyManager;
export const initProxyManager = async () => {
  proxyManager = await ProxyManager.createAndRun({
    config: {
      log: {
        name: 'proxy',
      },
    },
    ...parseProxyParam(process.env.PROXY),
    // __lifecycle: {
    //   create: new Date(),
    // },
  });
};
if (process.env.PROXY) initProxyManager();

// 'NETWORK_NOT_200',
// 'NETWORK_JSON_EXPECTED',
// 'NETWORK_BAN',
// 'NETWORK_RECAPCHA',
// 'NETWORK_TOO_MANY_REQUESTS',
// 'PROXY_AUTH_REQUIRED',
// 'NETWORK_BAN_CAPCHA',
// 'FETCH_TIMEOUT',

const wildcardNetworkErrors = ['PROXY_', 'NETWORK_'];
const networkErrors = [
  'ECONNRESET',
  'ECONNREFUSED',
  'TIMEOUT_RESPONSE_TEXT',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'EHOSTUNREACH',
  'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
  'EPROTO',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'CERT_HAS_EXPIRED',
  'EAI_AGAIN',
  'Z_BUF_ERROR',
  'ENETUNREACH',
  'ERR_TLS_CERT_ALTNAME_INVALID',
];

export const MAX_NETWORK_TIMEOUT = isDev ? 1000 : 15000;
export const MAX_NETWORK_TRIES = isDev ? 2 : 10;
export async function request({
  driver = 'axios',
  max_tries: maxTries = MAX_NETWORK_TRIES,
  timeout = MAX_NETWORK_TIMEOUT,
  proxy,
  ...params
}) {
  if (driver !== 'axios') throw 'driver not realized yet';
  let options = { ...params };

  if (!proxy) {
    if (proxyManager) {
      // eslint-disable-next-line no-param-reassign
      proxy = await proxyManager.getProxy();
    }
  }

  if (proxy) {
    options = {
      ...options,
      ...proxy.getProviderOptions(driver),
    };
  }

  let tries = 0;
  return retry(
    async () => {
      tries += 1;
      const prefix = tries > 1 ? `[R ${tries}/${maxTries}]` : '[R]';
      const startedAt = new Date();
      try {
        let logStr = '';
        if (driver !== 'axios') logStr += ` <${driver}>`;
        if (proxy) logStr += ` [proxy ${proxy.getUri()}]`;
        if (timeout) logStr += ` [timeout ${timeout}]`;
        if (params.method && params.method.toLowerCase() !== 'get') logStr += ` ${params.method}`;
        if (proxyManager) proxyManager.log.trace(prefix, logStr, params.url);

        let abortTimeout;
        if (timeout && !params.cancelToken) {
          const { CancelToken } = axios;
          const source = CancelToken.source();
          options.cancelToken = source.token;
          abortTimeout = setTimeout(() => source.cancel('NETWORK_TIMEOUT'), timeout);
        }

        const res = await axios(options);
        if (abortTimeout) clearTimeout(abortTimeout);
        if (proxy) proxy.feedback({ status: 'success', time: Date.now() - startedAt });

        return res;
      } catch (err) {
        const errCode = Err.getCode(err);
        if (proxy) proxy.feedback({ status: 'error', err: errCode, time: Date.now() - startedAt });

        // if (err.code && err.message !== 'string') err = err.message; // get erroro from cancel token
        if (proxyManager) proxyManager.log.debug(prefix, 'err', errCode);
        const isRetry = wildcardNetworkErrors.filter(
          (w) => errCode && (errCode.startsWith(w).length || networkErrors.includes(errCode)),
        );
        // eslint-disable-next-line no-ex-assign
        if (errCode === 'NETWORK_TIMEOUT') err = new Err('NETWORK_TIMEOUT');
        if (isRetry) throw err;
        throw retry.StopError(err);
      }
    },
    {
      throw_original: true,
      max_tries: maxTries,
    },
  );
}

export default request;

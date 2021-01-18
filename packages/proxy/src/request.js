import axios from 'axios';
import Err from '@lskjs/utils/Err';
import retry from '@lskjs/utils/retry';
import { ProxyManager } from './ProxyManager';

const proxyManager = new ProxyManager({
  name: 'proxy',
  raw: process.env.PROXY,
});


// 'NETWORK_NOT_200',
// 'NETWORK_JSON_EXPECTED',
// 'NETWORK_BAN',
// 'NETWORK_RECAPCHA',
// 'NETWORK_TOO_MANY_REQUESTS',
// 'PROXY_AUTH_REQUIRED',

const wildcardNetworkErrors = [
  'PROXY_',
  'NETWORK_',
]
const networkErrors = [
  'FETCH_TIMEOUT',
  'ECONNRESET',
  'ECONNREFUSED',
  'TIMEOUT_RESPONSE_TEXT',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'EHOSTUNREACH',
  'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
  'EPROTO',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'CERT_HAS_EXPIRED',
  'NETWORK_BAN_CAPCHA',
  'EAI_AGAIN',
  'Z_BUF_ERROR',
  'ENETUNREACH',
  'ERR_TLS_CERT_ALTNAME_INVALID',
];

export const MAX_NETWORK_TRIES = 10;
export async function request({ driver = 'axios', max_tries: maxTries = MAX_NETWORK_TRIES, timeout, ...params }) {
  if (driver !== 'axios') throw 'driver not realized yet';
  await proxyManager.__run();

  let options = { ...params };

  const proxy = await proxyManager.getProxy();

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
      try {
        let logStr = '[R]';
        if (driver !== 'axios') logStr += ` <${driver}>`;
        if (tries > 1) logStr += `${tries}/${maxTries}`;
        if (proxy) logStr += `[proxy ${proxy.getUri()}]`;
        if (params.method && params.method.toLowerCase() !== 'get') logStr += ` ${params.method}`;
        proxyManager.log.trace(logStr, params.url);

        let abortTimeout;
        if (timeout && !options.cancelToken) {
          const { CancelToken } = axios;
          const source = CancelToken.source();
          options.cancelToken = source.token;
          abortTimeout = setTimeout(() => source.cancel(new Err('NETWORK_TIMEOUT')), timeout);
        }

        const res = await axios(options);

        if (abortTimeout) clearTimeout(abortTimeout);

        return res;
      } catch (err) {
        const errCode = Err.getCode(err);
        const isRetry = wildcardNetworkErrors.filter(w => errCode.startsWith(w)).length || networkErrors.includes(errCode);
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

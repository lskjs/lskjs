import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import retry from '@lskjs/utils/retry';
import axios from 'axios';

import { ProxyManager } from './ProxyManager';
import { isNetworkError } from './utils/isNetworkError';
import { parseProxyParam } from './utils/parseProxyParam';

let proxyManager;
export const initProxyManager = async () => {
  proxyManager = await ProxyManager.start({
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

export const NETWORK_TIMEOUT = isDev ? 1000 : 10000;
export const NETWORK_TRIES = isDev ? 2 : 5;
export const NETWORK_INTERVAL = isDev ? 100 : 1000;

export async function request({
  driver = 'axios',
  max_tries: maxTries = NETWORK_TRIES,
  timeout = NETWORK_TIMEOUT,
  interval = NETWORK_INTERVAL,
  proxy: initProxy,
  ...params
}) {
  if (driver !== 'axios') throw new Err('driver not realized yet');
  let tries = 0;
  return retry(
    async () => {
      let proxy;
      if (initProxy) {
        proxy = initProxy;
      }
      if (!proxy && proxyManager) {
        proxy = await proxyManager.getProxy();
      }
      let options = { ...params };
      if (proxy) {
        options = {
          ...params,
          ...proxy.getProviderOptions(driver),
        };
      }
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
      } catch (initErr) {
        const errCode = Err.getCode(initErr);
        if (proxy) proxy.feedback({ status: 'error', err: errCode, time: Date.now() - startedAt });
        if (proxyManager) proxyManager.log.debug(prefix, 'err', errCode);
        proxy = null;
        let err;
        if (isNetworkError(initErr)) {
          err = new Err('REQUEST_NETWORK', initErr, { subcode: errCode, class: 'network' });
        } else {
          err = new Err(initErr);
        }
        Err.copyProps(err, initErr);
        if (!isNetworkError(initErr)) throw retry.StopError(err); // exit right now
        throw err; // try one again
      }
    },
    {
      throw_original: true,
      interval,
      max_tries: maxTries,
    },
  );
}

export default request;

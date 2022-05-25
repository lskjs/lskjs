/* eslint-disable max-len */
import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import retry from '@lskjs/utils/retry';
import axios from 'axios';

import { createFeedback as defaultCreateFeedback } from './utils/createFeedback';
import { getErrCode, isNetworkError, isNetworkFatal } from './utils/isNetworkError';

export const NETWORK_TIMEOUT = isDev ? 1000 : 10000;
export const NETWORK_TRIES = isDev ? 2 : 5;
export const NETWORK_INTERVAL = isDev ? 100 : 1000;

// TODO: дописать
export const getProviderOptions = (proxy, driver) => (proxy ? proxy.getProviderOptions(driver) : {});

// const createNoop = () => ({ success: () => null, error: () => null });

export const createRequest =
  ({
    createFeedback = defaultCreateFeedback,
    labels,
    onProxyManagerError,
    axios: axiosCreateParams,
    ...feedbackOptions
  } = {}) =>
  (props = {}) => {
    const {
      driver = 'axios',
      // max_tries: maxTries = NETWORK_TRIES,
      timeout = NETWORK_TIMEOUT,
      interval = NETWORK_INTERVAL,
      proxy: initProxy,
      interceptors,
      logPrefix,
      ...params
    } = props;
    const maxTries =
      props.max_tries ||
      props.maxTries ||
      props.max_retries ||
      props.maxRetries ||
      props.max_retry ||
      props.maxRetry ||
      props.tries ||
      NETWORK_TRIES;
    if (driver !== 'axios') throw new Err('REQUEST_DRIVER', 'driver not realized yet', { driver });
    let tries = 0;
    return retry(
      async () => {
        let proxy;
        if (initProxy) proxy = initProxy;
        const proxyManager = await (props.proxyManager || feedbackOptions.proxyManager); // TODO: подумать а не замудренно ли

        try {
          if (!proxy && proxyManager) proxy = await proxyManager.getProxy();
        } catch (err) {
          if (onProxyManagerError) {
            await onProxyManagerError({ err, tries, maxTries });
          }
        }

        const options = { ...params, ...getProviderOptions(proxy, driver) };
        tries += 1;
        const feedback = createFeedback
          ? createFeedback(
              { options: props, proxy, tries, maxTries, logPrefix },
              { ...feedbackOptions, proxyManager, labels },
            ) // TODO: подумать а не замудренно ли
          : null;
        try {
          let abortTimeout;
          if (timeout && !params.cancelToken) {
            const { CancelToken } = axios;
            const source = CancelToken.source();
            options.cancelToken = source.token;
            abortTimeout = setTimeout(() => source.cancel('REQUEST_NETWORK_TIMEOUT'), timeout);
          }
          const client = axios.create(axiosCreateParams);
          if (interceptors) {
            if (Array.isArray(interceptors.request)) {
              client.interceptors.request.use(...interceptors.request);
            } else {
              client.interceptors.request.use(interceptors.request);
            }
            if (Array.isArray(interceptors.response)) {
              client.interceptors.response.use(...interceptors.response);
            } else {
              client.interceptors.response.use(interceptors.response);
            }
          }
          const res = await client(options);
          res.proxyManager = proxyManager;
          res.proxy = proxy;
          const size = res?.headers?.['content-length'] ? Number(res?.headers?.['content-length']) : null;
          if (abortTimeout) clearTimeout(abortTimeout);
          if (feedback) await feedback.success({ size });
          return res;
        } catch (initErr) {
          const res = initErr?.response;
          const size = res?.headers?.['content-length'] ? Number(res?.headers?.['content-length']) : null;
          const code = getErrCode(initErr);
          const fatal = isNetworkFatal(initErr);
          const isNetwork = isNetworkError(initErr);
          proxy = null;
          let errProps = {
            proxyManager,
            proxy,
          };
          if (isNetwork) {
            errProps = { message: code, subcode: Err.getCode(initErr), class: 'network', tries, maxTries };
          }
          const err = new Err(code, initErr, errProps);
          Err.copyProps(err, initErr);
          if (feedback) await feedback.error(err, { fatal, size });
          if (!isNetwork) throw retry.StopError(err); // exit right now
          throw err; // try one again
        }
      },
      {
        throw_original: true,
        interval,
        max_tries: maxTries,
      },
    );
  };

export default createRequest;

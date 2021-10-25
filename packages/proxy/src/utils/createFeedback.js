/* eslint-disable no-param-reassign */
import Err from '@lskjs/err';

import { getProxyLabels } from './getProxyLabels';

const getTimeout = (startedAt) => (startedAt ? `${Date.now() - startedAt}ms` : '???ms');
const isLowerEqual = (str = '', str2 = '') => str && str.toLowerCase() === str2;

const logKeys = (...args) => args.map(([p1, p2]) => (p2 ? `[${p1}] ${p2}`.trim() : null)).filter(Boolean);

export const createFeedback = (props = {}, { log, stats, tx, apm } = {}) => {
  const { options = {}, proxy, tries, maxTries, startedAt = Date.now() } = props;
  const { driver, timeout, method, url } = options;
  const prefix = [
    ['R', tries > 1 ? `${tries}/${maxTries}` : null],
    ['method', !isLowerEqual(method, 'get') ? method : null],
    ['url', url],
  ];
  const trace = [
    ['driver', driver !== 'axios' ? driver : null],
    ['timeout', timeout],
  ];
  const postfix = [
    ['proxy', [proxy ? proxy.provider : null, proxy ? proxy.getUri() : 'localhost'].filter(Boolean).join(' ')],
  ];
  if (!tx && apm) tx = apm.startTransaction('request');
  if (tx) tx.addLabels(getProxyLabels(proxy));
  if (log) log.trace(...logKeys(...prefix, ...trace, ...postfix));
  return {
    success() {
      try {
        if (proxy && proxy.feedback) proxy.feedback({ status: 'success', time: Date.now() - startedAt });
        if (log) log.info('[success]', ...logKeys(...prefix, ['time', getTimeout(startedAt)], ...postfix));
        if (stats) stats.trigger({ event: 'success', startedAt });
        if (tx) tx.result = 'success';
        if (tx) tx.end();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('[createFeedback] success.err ', err);
      }
    },
    error(err) {
      try {
        const errCode = Err.getCode(err);
        if (proxy && proxy.feedback) proxy.feedback({ status: 'error', err: errCode, time: Date.now() - startedAt });
        if (log) log.error(...logKeys(...prefix, ['err', errCode], ['time', getTimeout(startedAt)], ...postfix));
        if (stats) stats.trigger({ event: 'error', startedAt });
        if (apm) apm.captureError({ code: Err.getCode(err), message: Err.getMessage(err) }); // TODO: подумать про await§
        if (tx) tx.result = errCode;
        if (tx) tx.end();
      } catch (err2) {
        // eslint-disable-next-line no-console
        console.log('[createFeedback] error.err ', err2);
      }
    },
  };
};

export default createFeedback;

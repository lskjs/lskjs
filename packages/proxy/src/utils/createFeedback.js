/* eslint-disable no-param-reassign */
import Err from '@lskjs/err';
import omitNull from '@lskjs/utils/omitNull';

import { getProxyLabels } from './getProxyLabels';
// import { getErrCode } from './isNetworkError';

const getTimeout = (time) => (time ? `${time}ms` : '???ms');
const isLowerEqual = (str = '', str2 = '') => str && str.toLowerCase() === str2;

const logKeys = (...args) => args.map(([p1, p2]) => (p2 ? `[${p1}] ${p2}`.trim() : null)).filter(Boolean);

export const createFeedback = (props = {}, { log, stats, tx, apm, labels } = {}) => {
  // console.log('[createFeedback]', { log: !!log, stats: !!stats, apm: !!apm });
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
  const customContext = {
    tries,
    maxTries,
    method,
    url,
  };
  if (tx) {
    tx.setCustomContext(customContext);
    tx.addLabels({
      ...(labels || {}),
      ...getProxyLabels(proxy),
    });
  }
  if (log) log.trace(...logKeys(...prefix, ...trace, ...postfix));
  return {
    success({ size } = {}) {
      try {
        const time = Date.now() - startedAt;
        if (proxy && proxy.feedback) proxy.feedback({ status: 'success', time, size });
        if (log) log.info('[success]', ...logKeys(...prefix, ['time', getTimeout(time)], ...postfix));
        if (stats) stats.trigger({ event: 'success', startedAt });
        if (tx) {
          tx.addLabels(omitNull({ time, size }));
          tx.result = 'success';
          tx.end();
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('[createFeedback] success.err ', err);
      }
    },
    error(initErr, { fatal, size } = {}) {
      try {
        const time = Date.now() - startedAt;
        const errCode = Err.getCode(initErr);
        const subcode = initErr?.subcode;
        const message = Err.getMessage(initErr);
        if (proxy && proxy.feedback) {
          proxy.feedback({ status: 'error', err: errCode, time, fatal, size });
        }
        if (log) log.error(...logKeys(...prefix, ['err', errCode], ['time', getTimeout(time)], ...postfix));
        if (stats) stats.trigger({ event: 'error', startedAt });
        if (apm) apm.captureError({ code: errCode, subcode, message, data: initErr.data }); // TODO: подумать про await§
        if (tx) {
          tx.setCustomContext({ ...customContext, errCode, errSubcode: subcode, errMessage: message });
          tx.addLabels(omitNull({ time, size }));
          tx.result = errCode;
          tx.end();
        }
      } catch (err3) {
        // eslint-disable-next-line no-console
        console.log('[createFeedback] error.err ', err3);
      }
    },
  };
};

export default createFeedback;

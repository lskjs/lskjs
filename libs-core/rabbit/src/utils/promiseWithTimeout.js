// import { isFunction } from '@lskjs/utils/isFunction';
import { Err } from '@lskjs/err';
import isFunction from 'lodash/isFunction';

export const promiseWithTimeout = async (promiseOrFn, timeout = 15000) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Err('PROMISE_TIMEOUT', { timeout }));
    }, timeout);
  });
  const promise = isFunction(promiseOrFn) ? promiseOrFn() : promiseOrFn;
  const res = await Promise.race([promise, timeoutPromise]);
  clearTimeout(timeoutId);
  return res;
};

export default promiseWithTimeout;

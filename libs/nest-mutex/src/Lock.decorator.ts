/* eslint-disable no-nested-ternary */
import { isFunction } from '@nestjs/common/utils/shared.utils';
import AsyncLock from 'async-lock';

export function Lock({ key: initKey, log = null, ...options }) {
  const lock = new AsyncLock(options);
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function (...args: any[]) {
      const key = initKey ? (isFunction(initKey) ? await initKey(...args) : initKey) : propertyKey;
      if (log) log.debug('@Lock start', key, args);
      const res = await lock.acquire(key, async () => method.apply(this, args));
      if (log) log.debug('@Lock finish', key);
      return res;
    };
  };
}

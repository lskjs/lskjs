import { createLogger } from '@lskjs/log';
import { isFunction, isNil } from '@nestjs/common/utils/shared.utils';
import { LRUCache as BaseLRUCache } from 'lru-cache';

export const cacheManager = new BaseLRUCache({
  max: 1000,
});
// import { log } from '../../prevapp/log';

const log = createLogger('@LruCache', { ns: 'cache', name: '@LruCache', level: 'warn' });

const getValue = (value: any, args: any, defaultKey: any) => {
  if (isNil(value)) {
    return defaultKey;
  }
  if (isFunction(value)) {
    return value(args);
  }
  return value;
};

const DEFAULT_TTL = 60 * 60 * 1000;

export function LruCache({ key: keyValueOrFactory = null, ttl: ttlValueOrFactory = null } = {}) {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    const className = target.constructor.name;
    const targetMethod = `${className}.${propertyKey}`;
    log.debug('init', targetMethod, { keyValueOrFactory, ttlValueOrFactory });

    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function (...args: any[]) {
      const key = getValue(keyValueOrFactory, args, targetMethod);
      const ttl = getValue(ttlValueOrFactory, args, DEFAULT_TTL);

      const value = await cacheManager.get(key);
      if (!isNil(value)) {
        log.trace('get', key);
        return value;
      }
      const response = await method.apply(this, args);
      log.trace('set', key, { ttl });
      if (isNil(ttl)) {
        cacheManager.set(key, response);
      } else {
        cacheManager.set(key, response, { ttl });
      }
      return response;
    };
  };
}

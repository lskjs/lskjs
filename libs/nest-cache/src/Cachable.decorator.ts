import { Err } from '@lskjs/err';
import { CACHE_KEY_METADATA, CACHE_TTL_METADATA } from '@nestjs/cache-manager';
import { isFunction, isNil } from '@nestjs/common/utils/shared.utils';

export function Cachable() {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function (...args: any[]) {
      if (!this.cacheManager) throw new Err('!this.cacheManager');
      const key = Reflect.getMetadata(CACHE_KEY_METADATA, descriptor ? descriptor.value : target);
      const ttlValueOrFactory = Reflect.getMetadata(
        CACHE_TTL_METADATA,
        descriptor ? descriptor.value : target,
      );
      const value = await this.cacheManager.get(key);
      if (!isNil(value)) {
        return value;
      }
      const ttl = isFunction(ttlValueOrFactory) ? await ttlValueOrFactory(args) : ttlValueOrFactory;
      const response = await method.apply(this, args);
      if (isNil(ttl)) {
        this.cacheManager.set(key, response);
      } else {
        this.cacheManager.set(key, response, { ttl });
      }
      return response;
    };
  };
}

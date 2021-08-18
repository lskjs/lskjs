import { Mutex } from '@lskjs/mutex';
import { delay } from '@lskjs/utils/delay';
import { getWildcardKeys } from '@lskjs/utils/getWildcardKeys';

export class CacheStorage {
  data = {};
  mutexes = {};
  constructor(props = {}) {
    Object.assign(this, props);
  }
  clearCache(keyOrKeys) {
    if (!Array.isArray(keyOrKeys)) {
      // eslint-disable-next-line no-param-reassign
      keyOrKeys = [keyOrKeys];
    }
    // TODO: object to string
    getWildcardKeys(Object.keys(this.data), keyOrKeys).forEach((key) => {
      delete this.data[key];
    });
  }
  fork(props = {}) {
    return {
      cache: (a, b) => this.cache(a, b, props),
    };
  }
  async cache(initKey, value, { prefix } = {}) {
    const key = [prefix, initKey].filter(Boolean).join('.');
    if (this.data[key]) return this.data[key];
    if (!this.mutexes[key]) {
      this.mutexes[key] = new Mutex();
      const release = await this.mutexes[key].acquire();
      if (value instanceof Promise) {
        this.data[key] = await value;
      } else if (typeof value === 'function') {
        this.data[key] = await value();
      } else {
        this.data[key] = value;
      }
      release();
      return this.data[key];
    }
    if (this.mutexes[key].isLocked()) {
      await delay(100);
      return this.cache(key, value);
    }
    return this.data[key];
  }
}

export default CacheStorage;

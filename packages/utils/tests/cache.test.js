/* global test expect */
import { Mutex } from 'async-mutex';
import Promise from 'bluebird';

class CacheStore {
  data = {};
  mutexes = {};
  async cache(key, value) {
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
      await Promise.delay(100);
      return this.cache(key, value);
    }
    return this.data[key];
  }
}

test('cacheStore', async () => {
  const cacheStore = new CacheStore();
  const keysMap = {
    1: 0,
    2: 0,
  };
  await Promise.map([{ key: 1 }, { key: 2 }, { key: 1 }, { key: 2 }, { key: 1 }, { key: 1 }], async ({ key }) => {
    await cacheStore.cache(key, async () => {
      keysMap[key] += 1;
      await Promise.delay(1000);
    });
  });
  expect(keysMap).toEqual({ 1: 1, 2: 1 });
});

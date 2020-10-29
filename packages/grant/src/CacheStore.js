import { Mutex } from 'async-mutex';
import Promise from 'bluebird';

export default class CacheStore {
  data = {};
  mutexes = {};
  // constructor() {
  //   this.initialDate = Date.now();
  // }
  async cache(key, value) {
    // if (value instanceof Promise) {
    //   return value;
    // } else if (typeof value === 'function') {
    //   return value();
    // } else {
    //   return value;
    // }
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

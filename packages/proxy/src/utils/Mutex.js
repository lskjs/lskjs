/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import { Mutex as BaseMutex } from 'async-mutex';
import Bluebird from 'bluebird';

export class Mutex extends BaseMutex {
  async isAsyncLocked(timeout = 1000, interval = 100) {
    const startedAt = new Date();
    while (true) {
      if (!this.isLocked()) return false;
      if (timeout && startedAt + timeout < Date.now()) return true;
      await Bluebird.delay(interval);
    }
  }
}

export default Mutex;

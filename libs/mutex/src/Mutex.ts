/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import { Mutex as BaseMutex } from 'async-mutex';

const delay = (duration: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((resolve: any) => setTimeout(resolve, duration));

export class Mutex extends BaseMutex {
  async isAsyncLocked(timeout = 1000, interval = 100) {
    const startedAt = new Date();
    while (true) {
      if (!this.isLocked()) return false;
      if (timeout && Number(startedAt) + timeout < Date.now()) return true;
      await delay(interval);
    }
  }
}

export default Mutex;

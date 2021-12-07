/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import Bluebird from 'bluebird';

import log from './log';
import { IWatchStream, watchCallback, watchOptions } from './types';

export const watchBluebird = (
  stream: IWatchStream,
  callback: watchCallback,
  { concurrency: maxConcurrency = 100 }: watchOptions = {},
): IWatchStream => {
  let queue: string[] = [];
  const stopped = false;
  let gracefulStopping = false;
  let sum = 0;

  stream
    .on('line', (raw: string) => {
      queue.push(raw);
      sum += 1;
    })
    .on('close', () => {
      log.debug('[watch] gracefulStopping', sum);
      gracefulStopping = true;
    });

  let i = 0;
  (async () => {
    while (!stopped) {
      i += 1;
      if (!queue.length) {
        if (gracefulStopping) {
          // @ts-ignore
          process.emit('SIGINT');
          continue;
        }
        if (i % 1000 === 0) log.trace('[watch] waiting', i);
        await Bluebird.delay(10);
        continue;
      }
      if (i % 1000 === 0) log.debug('[watch] running', i);
      const fixedQueue = queue;
      queue = [];
      await Bluebird.map(fixedQueue, callback, { concurrency: maxConcurrency });
    }
    log.debug('[watch] stopped', sum);
  })();

  return stream;
};

export default watchBluebird;

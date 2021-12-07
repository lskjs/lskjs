/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import Bluebird from 'bluebird';

import log from './log';
import { IWatchStream, watchCallback, watchOptions } from './types';

export const watchCombine = (
  stream: IWatchStream,
  callback: watchCallback,
  { concurrency: maxConcurrency = 100 }: watchOptions = {},
): IWatchStream => {
  let sum = 0;
  let fixedQueue = [];
  let queue: string[] = [];
  stream
    .on('line', (raw: string) => {
      sum += 1;
      queue.push(raw);
      if (queue.length > maxConcurrency) stream.pause();
    })
    .on('close', () => {
      log.debug('[watch] gracefulStopping', sum);
    });
  const isRun = () => stream.closed && !queue.length && !fixedQueue.length;

  let cycle = 0;
  (async () => {
    while (!isRun()) {
      cycle += 1;
      if (!queue.length) {
        if (cycle % 1000 === 0) log.trace('[watch] waiting', cycle);
        await Bluebird.delay(10);
        continue;
      }
      log.debug('[watch] running', cycle);
      fixedQueue = queue;
      queue = [];
      if (stream.paused) stream.resume();
      await Bluebird.map(fixedQueue, callback, { concurrency: maxConcurrency });
    }
    log.debug('[watch] finished', sum);
  })();

  return stream;
};

export default watchCombine;

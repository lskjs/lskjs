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
  const isRun = () => {
    const isRunBool = !stream.closed || !!queue.length || !!fixedQueue.length;
    // console.log('stream.closed', stream.closed);
    // console.log('queue.length', queue.length);
    // console.log('fixedQueue.length', fixedQueue.length);
    // console.log('isRunBool', !stream.closed, !queue.length, !fixedQueue.length);
    // console.log('isRunBool', !stream.closed || !queue.length || !fixedQueue.length);
    // console.log('isRunBool', isRunBool);
    return isRunBool;
  };

  let cycle = 0;
  (async () => {
    while (isRun()) {
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
      fixedQueue = [];
    }
    log.info('[watch] finished', sum);
    log.debug('process kill in 10sec');
    setTimeout(() => {
      log.debug('process kill now');
      process.exit();
    }, 10000);
  })();

  return stream;
};

export default watchCombine;

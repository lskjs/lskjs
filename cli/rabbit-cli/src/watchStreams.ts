/* eslint-disable no-plusplus */
import log from './log';
import { IWatchStream, watchCallback, watchOptions } from './types';

export const watchStreams = (
  stream: IWatchStream,
  callback: watchCallback,
  { concurrency: maxConcurrency = 100 }: watchOptions = {},
): IWatchStream => {
  let count = 0;
  let concurrency = 0;
  return stream
    .on('line', async (raw: any) => {
      const i = count++;
      try {
        concurrency += 1;
        log.trace('[watch] line', { count: i, concurrency });
        if (!stream.paused && concurrency >= maxConcurrency) {
          log.trace('[watch] paused', { count: i, concurrency });
          stream.pause();
        }
        await callback(raw, i);
      } finally {
        concurrency -= 1;
        if (stream.paused && concurrency < maxConcurrency) {
          stream.resume();
          log.trace('[watch] resumed', { count: i, concurrency });
        }
        log.trace('[watch] end', { count: i, concurrency });
      }
    })
    .on('close', () => {
      log.debug('[watch] stopped', { count, concurrency });
    });
};

export default watchStreams;

#!/usr/bin/env node
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
import { Err } from '@lskjs/err';
import rabbit, { Options } from 'amqplib';
import * as CLI from 'cli-flags';
import readline from 'readline';

import log from './log';
import { IWatchStream } from './types';
import watch from './watchCombine';

const { flags, args } = CLI.parse({
  flags: {
    uri: CLI.flags.string({ char: 'u' }),
    queue: CLI.flags.string({ char: 'q' }),
    prefetch: CLI.flags.string({ char: 'p' }),
    concurrency: CLI.flags.string({ char: 'c' }),
  },
  args: [{ name: 'cmd', required: true }],
});

const uri = flags.uri || process.env.AMQP_URI;
const defaultQueue = flags.queue || process.env.AMQP_QUEUE;
const concurrency = Number(flags.prefetch || process.env.AMQP_PREFETCH) || 10;
const maxPriority = Number(flags.concurrency || process.env.AMQP_MAX_PRIORITY) || 10;
const { cmd } = args;

const main = async ({ isConfirm = false, isPublish = false } = {}) => {
  log.info('starting', { cmd }, { uri, defaultQueue, concurrency, maxPriority });
  if (!uri) throw new Err('!uri', 'use AMQP_URI');
  if (cmd !== 'pub') throw new Err('cmd !== pub', { cmd });
  const connection = await rabbit.connect(uri);
  const channel = await (isConfirm ? connection.createConfirmChannel() : connection.createChannel());
  const queues = {};
  const sendToQueue = async (
    queue: string,
    data: any,
    { persistent = false, priority = 5, expiration = 23 * 60 * 60 * 1000, ...other }: Options.Publish = {},
  ) => {
    // log.trace('[sendToQueue]', queue, data, { priority, expiration });
    if (!queue) throw new Err('!queue', 'use AMQP_QUEUE');
    if (!queues[queue]) {
      if (isPublish) {
        log.debug('assertQueue', queue, { durable: true, maxPriority });
        await channel.assertQueue(queue, { durable: true, maxPriority });
      } else {
        log.debug('assertQueue', queue, { maxPriority });
        await channel.assertQueue(queue, { maxPriority });
      }
    }
    queues[queue] = (queues[queue] || 0) + 1;
    const buffer = Buffer.from(JSON.stringify(data));
    const options: Options.Publish = { persistent, priority, expiration, ...other };

    let promise;
    if (isPublish) {
      promise = channel.publish('', queue, buffer, { mandatory: false, ...options });
    } else {
      promise = channel.sendToQueue(queue, buffer, options);
    }

    return promise;
  };

  let start = 0;
  let finish = 0;
  const initStream: IWatchStream = readline.createInterface({
    input: process.stdin,
    output: undefined,
  }) as IWatchStream;
  const stream = watch(
    initStream,
    async (raw) => {
      if (++start % 10000 === 0) log.debug('[start]', start, raw);
      // const id = start;
      try {
        const { _q: queue = defaultQueue, _pr: persistent, _p: priority, _e: expiration, ...data } = JSON.parse(raw);
        const res = await sendToQueue(queue, data, { priority, persistent, expiration });
        if (++finish % 10000 === 0) log.debug('[finish]', finish, raw);
        return res;
      } catch (err) {
        log.error('[err]', err);
        if (++finish % 10000 === 0) log.debug('[finish]', finish, raw);
        throw err;
      }
    },
    { concurrency },
  );
  process.once('SIGINT', () => {
    log.info({ start, finish });
    connection.close();
    stream.close();
  });
};

main().catch((err) => {
  log.error(err);
});

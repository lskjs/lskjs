#!/usr/bin/env node
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
import { Err } from '@lskjs/err';
import rabbit, { Options } from 'amqplib';
import readline from 'readline';

import log from './log';
import { IWatchStream } from './types';
import watch from './watchCombine';

const uri = process.env.AMQP_URI;
const defaultQueue = process.env.AMQP_QUEUE;
const concurrency = Number(process.env.AMQP_PREFETCH) || 10;
const maxPriority = Number(process.env.AMQP_MAX_PRIORITY) || 10;

const main = async ({ isConfirm = false, isPublish = false } = {}) => {
  if (!uri) throw new Err('!uri', 'use AMQP_URI');
  log.info('starting');
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
        await channel.assertQueue(queue, { durable: true, maxPriority });
      } else {
        await channel.assertQueue(queue, { maxPriority });
      }
      queues[queue] = 1;
    }
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
        const {
          __queue: queue = defaultQueue,
          __persistent: persistent,
          __priority: priority,
          __expiration: expiration,
          ...data
        } = JSON.parse(raw);
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

#!/usr/bin/env node
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
import { Err } from '@lskjs/err';
import rabbit, { Options } from 'amqplib';
import readline from 'readline';

import log from '../log';
import { IWatchStream, publishOptions, watchCallback } from '../types';
import watch from '../watchCombine';

export const publish = async ({
  uri,
  parseFn,
  extractFn,
  queue: defaultQueue,
  exchange: defaultExchange,
  priority: defaultPriority = 5,
  expiration: defaultExpiration = 23 * 60 * 60 * 1000,
  data: rawData,

  concurrency = 10,
  maxPriority = 10,
  isConfirm = false,
}: publishOptions = {}) => {
  if (!uri) throw new Err('!uri', 'use AMQP_URI');
  const connection = await rabbit.connect(uri);
  const channel = await (isConfirm ? connection.createConfirmChannel() : connection.createChannel());
  const queues = {};
  const parseRaw = (
    raw: string,
  ): { to: Record<string, unknown>; data: Record<string, unknown>; options: Record<string, unknown> } | null => {
    try {
      const rawJson = parseFn ? parseFn(raw) : JSON.parse(raw);
      const json = extractFn ? extractFn(rawJson) : rawJson;
      // console.log({ raw, rawJson, json });
      if (!json) return null;
      const { _q, _queue, _e, _exchange, _k, _key, _exp, _expiration, _p, _priority, _pr, _persistent, ...data } = json;
      const queue = _q || _queue;
      const exchange = _e || _exchange;
      const key = _k || _key;
      const expiration = _exp || _expiration || defaultExpiration;
      const priority = _p || _priority || defaultPriority;
      const persistent = _pr || _persistent;

      const options = { priority, persistent, expiration };

      const to = { queue, exchange, key };
      if (!to.queue && !to.exchange) {
        to.queue = defaultQueue;
        to.exchange = defaultExchange;
      }
      return {
        to,
        data,
        options,
      };
    } catch (err) {
      log.error('[parseRaw]', raw, err);
      return null;
    }
  };
  const sendToQueue = async (
    to: {
      queue?: string;
      exchange?: string;
      key?: string;
    } = {},
    data: any,
    options: Options.Publish = {},
  ) => {
    const { queue, exchange, key } = to;
    log.trace('[sendToQueue]', to, data, options);
    if (!queue && !exchange) throw new Err('!queue', 'use AMQP_QUEUE');
    if (queue) {
      if (!queues[queue]) await channel.assertQueue(queue, { durable: true, maxPriority });
      queues[queue] = (queues[queue] || 0) + 1;
    }
    const buffer = Buffer.from(JSON.stringify(data));
    let promise;
    if (exchange) {
      promise = channel.publish(exchange, key || '', buffer, { mandatory: false, ...options });
    } else if (queue) {
      promise = channel.sendToQueue(queue, buffer, options);
    }

    return promise;
  };

  let start = 0;
  let finish = 0;
  let errors = 0;
  const execMessage: watchCallback = async (raw: any) => {
    if (++start % 10000 === 0) log.debug('[start]', start, raw);
    // const id = start;
    try {
      const params = parseRaw(raw);
      if (!params) return null;
      const { to, data, options } = params;
      const res = await sendToQueue(to, data, options);
      if (++finish % 10000 === 0) log.debug('[finish]', finish, raw);
      return res;
    } catch (err) {
      log.error('[err]', err);
      if (++errors % 1 === 0) log.warn('[errors]', errors, raw);
      if (++finish % 10000 === 0) log.debug('[finish]', finish, raw);
      throw err;
    }
  };

  if (rawData) {
    await execMessage(rawData, 0);
    return;
  }

  const initStream: IWatchStream = readline.createInterface({
    input: process.stdin,
    output: undefined,
  }) as IWatchStream;
  const stream = watch(initStream, execMessage, { concurrency });

  const onExit = () => {
    log.info({ start, finish, errors });
    connection.close();
    stream.close();
  };
  process.once('exit', onExit);
  process.once('SIGINT', onExit);
  process.once('SIGUSR1', onExit);
  process.once('SIGUSR2', onExit);
};

export default publish;

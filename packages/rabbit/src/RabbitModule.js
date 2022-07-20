import Err from '@lskjs/err';
import Module from '@lskjs/module';
import maskUriPassword from '@lskjs/utils/maskUriPassword';
import amqp from 'amqplib';
import Bluebird from 'bluebird';
import EventEmitter from 'events';
import get from 'lodash/get';
import omit from 'lodash/omit';
import hash from 'object-hash';

import startGoProc from './startGoProc';
import { promiseWithTimeout } from './utils/promiseWithTimeout';

const serializeData = (data = {}) => {
  if (typeof data === 'string') return data;
  return JSON.stringify(data);
};

const noop = () => {
  //
};

export class RabbitModule extends Module {
  startGoProc = startGoProc;
  config = {
    prefetch: 1,
    reconnectTimeout: 5000,
  };
  async init() {
    await super.init();
    this.enabled = !this.config.disabled;
    if (!this.enabled) return;
    this.emitter = new EventEmitter();
    if (!this.config.uri) {
      this.log.warn('!config.uri using localhost');
      this.config.uri = 'amqp://localhost';
    }
    this.log.debug('uri', maskUriPassword(this.config.uri));
    if (!this.config.queues) {
      this.log.warn('!config.queues');
    }
    this.queues = this.config.queues || {};
    this.exchanges = this.config.exchanges || {};

    this.goRabbitPath = this.config.goRabbit;
    this.isGoTransport = !!this.goRabbitPath;

    if (this.isGoTransport) {
      this.log.debug('using go lang transport', this.goRabbitPath);
    }
    this.tryReconnect = false;
  }
  async createConnection({ withoutListeners = false } = {}) {
    const { socketOptions = {} } = this.config;
    const connection = await amqp.connect(this.config.uri, { timeout: 10000, ...socketOptions });
    if (!withoutListeners) {
      connection.once('error', this.onError.bind(this));
      connection.once('close', this.onError.bind(this));
    }
    return connection;
  }
  async connect() {
    this.log.trace('connecting', maskUriPassword(this.config.uri));
    this.listenConnection = await this.createConnection();
    this.sendConnection = await this.createConnection();
    this.listenChannel = await this.listenConnection.createChannel();
    this.sendChannel = await this.sendConnection.createConfirmChannel();
    this.onOpen();
    const prefetchCount = get(this.config, 'options.prefetch');
    if (prefetchCount) {
      // TODO: подумать тут ли это оставлять?
      this.listenChannel.prefetch(prefetchCount);
    }
    if (this.isGoTransport) {
      this.startGoProc();
    }
    this.log.debug('connected');
    this.emit('connected');
  }
  async run() {
    if (!this.enabled) return;
    await super.run();
    try {
      await this.connect();
    } catch (e) {
      await this.onError(e);
    }
  }
  onOpen() {}
  async restart() {
    try {
      await this.cancel();
      await this.stop();
      await this.connect();
      this.tryReconnect = false;
    } catch (e) {
      await this.onError(e);
    }
  }
  // debouncedOnError = debounce(this.onError, 1);
  async onError(err) {
    if (!err) return;
    if (this.tryReconnect) return;
    this.tryReconnect = true;
    this.emit('connectionError');
    this.log.error('[onError]', err);
    if (Err.getCode(err) === 'Unexpected close') {
      setTimeout(() => {
        this.log.fatal('[ALARM]', 'PROCESS.KILL in 5 sec', err);
        process.kill(1);
      }, 5000);
    }
    const { reconnectTimeout } = this.config;
    this.log.debug(`error, wait ${reconnectTimeout} ms for restart connect`);
    await Bluebird.delay(reconnectTimeout);
    this.restart();
  }
  async ack(msg, { allUpTo } = {}) {
    return this.listenChannel.ack(msg, allUpTo);
  }
  async nack(msg, { allUpTo, requeue } = {}) {
    return this.listenChannel.nack(msg, allUpTo, requeue);
  }
  async parse() {
    throw new Err('not implemented worker.parse()');
  }
  queue(rawQueue) {
    // NOTE: deprecated
    return rawQueue;
    // const queueName = this.getQueueName(rawQueue);
    // if (!queueName) throw new Err('rabbit.queueNotFound', { data: { queueName } });
    // await this.assertQueueOnce(queueName);
    // return rawQueue;
  }
  getQueueName(rawQueue) {
    let queueName = rawQueue;
    if (!rawQueue) {
      throw new Err('!rawQueue', { rawQueue });
    } else if (typeof rawQueue === 'string') {
      queueName = rawQueue;
    } else {
      queueName = rawQueue.name || rawQueue.queue;
    }
    let res = this.queues[queueName] ? this.queues[queueName].queue : queueName;
    // TODO: WHY prefix_prefix_prefix_prefix_order_list
    // TODO: remove this KOSTYL'!!
    if (this.config.prefix && !res.startsWith(this.config.prefix)) res = this.config.prefix + res;
    return res;
  }
  getQueueParams(rawQueue) {
    // const queueName = this.getQueueName(rawQueue);
    if (this.queues[rawQueue]) return this.queues[rawQueue];
    return {
      queue: this.getQueueName(rawQueue),
    };
  }
  assertQueues = {};
  async assertQueueOnce(rawQueue) {
    if (this.assertQueues[rawQueue]) return null;
    this.assertQueues[rawQueue] = new Date();
    const res = await this.assertQueue(rawQueue);
    return res;
  }
  async assertQueue(rawQueue) {
    const queueName = this.getQueueName(rawQueue);
    // console.log({ queue, queueName });
    if (!queueName) {
      this.log.error('!queueName', { rawQueue, queueName });
      throw new Err('!queueName', { rawQueue, queueName });
    }
    const options = get(this.config, 'options');
    this.log.trace(`assertQueue(${queueName})`, omit(options, ['prefetch']));
    const res = await this.listenChannel.assertQueue(queueName, options);
    return res;
  }
  assertExchange(exchange, type = 'direct', options = {}) {
    this.log.trace(`assertExchange(${exchange}, ${type})`, omit(options, ['prefetch']));
    return this.listenChannel.assertExchange(exchange, type, options);
  }
  async publish(exchange, key, msg, options = {}, channel = this.sendChannel) {
    const row = serializeData(msg);
    return new Bluebird((res, rej) => {
      channel.publish(exchange, key, Buffer.from(row), options, (err, ok) => {
        if (err) {
          rej(err);
        } else {
          res(ok);
        }
      });
    });
  }
  bindQueue(queue, source, pattern, ...args) {
    return this.listenChannel.bindQueue(queue, source, pattern, ...args);
  }
  async sendToQueue(rawQueue, data, options, channel = this.sendChannel) {
    const queueName = this.getQueueName(rawQueue);
    const queueParams = this.getQueueParams(rawQueue);
    await this.assertQueueOnce(queueName);
    const mergedOptions = { ...get(this, 'config.queueOptions', {}), ...(queueParams.options || {}), ...options };
    return new Bluebird((res, rej) => {
      const row = serializeData(data);
      channel.sendToQueue(queueName, Buffer.from(row), mergedOptions, (err, ok) => {
        if (err) {
          rej(err);
        } else {
          res(ok);
        }
      });
    });
  }

  async sendToQueueNative(rawQueue, data) {
    const queueName = this.getQueueName(rawQueue);
    const debug = this.config.debug || false;
    // const rows = serializeDataArray(data);
    const taskHash = `${hash(JSON.parse(JSON.stringify({ queueName, data })))}_${Date.now()}_${Math.random()}}`;
    const row = JSON.stringify({
      queue: queueName,
      hash: taskHash,
      content: serializeData(data),
    });
    if (debug) {
      this.log.trace('[RM] sendToQueueNative', queueName, row.substr(0, 30));
    }

    const { proc } = this;
    proc.stdin.write(row);
    proc.stdin.write('\n');
    // this.log.trace('--------WRITE-----');
    // this.log.trace(row);
    // this.log.trace('/--------WRITE-----/');
    await new Promise((resolve) => {
      this.emitter.once('close', async () => {
        if (debug) {
          this.log.trace('[RM] reject', row);
        }
        await Bluebird.delay(1000);
        return this.sendToQueueNative(queueName, data).then(resolve);
      });
      this.emitter.once(taskHash, () => {
        resolve();
      });
    });
  }
  async consume(rawQueue, callback, initOptions = {}) {
    await this.assertQueueOnce(rawQueue);
    const queueName = this.getQueueName(rawQueue);
    const options = {
      ...(this.config.options || {}),
      ...initOptions,
    };
    if (!options.prefetch) {
      this.log.warn(`[${queueName}] prefetch == 0, rabbit.consume ignore`);
      return null;
    }
    this.log.info(`consume(${queueName})`, options);
    const data = await this.listenChannel.consume(queueName, callback, options);
    this.consumerTag = data.consumerTag;
    return data;
  }
  async cancel() {
    try {
      await this.listenChannel.cancel(this.consumerTag);
    } catch (err) {}
  }
  async stop() {
    // this.log.warn('STOP ALL CONNECTIONS')
    try {
      await this.listenChannel.close();
    } catch (err) {}
    try {
      await this.listenConnection.close();
    } catch (err) {}
    try {
      await this.sendChannel.close();
    } catch (err) {}
    try {
      await this.sendConnection.close();
    } catch (err) {}
  }
  async healthcheck() {
    return promiseWithTimeout(async () => {
      // try {
      const sendConnection = await this.createConnection({
        withoutListeners: true,
      });
      sendConnection.once('close', noop);
      sendConnection.once('error', noop);
      const sendChannel = await sendConnection.createConfirmChannel();
      sendChannel.once('close', noop);
      sendChannel.once('error', noop);
      // TODO не делать ассерт каждый раз
      await sendChannel.assertQueue('healthcheck');
      await this.sendToQueue(
        'healthcheck',
        {
          random: Math.random(),
        },
        { expired: 24 * 60 * 60 * 1000 },
        sendChannel,
      );
      await sendChannel.close();
      await sendConnection.close();
      return true;
      // } catch (e) {
      //   return false;
      // }
    }, 15000);
  }
}

export default RabbitModule;

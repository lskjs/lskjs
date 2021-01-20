import Bluebird from 'bluebird';
import get from 'lodash/get';
import omit from 'lodash/omit';
import amqp from 'amqplib';
import hash from 'object-hash';
import EventEmitter from 'events';
import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
import maskUriPassword from '@lskjs/utils/maskUriPassword';
import startGoProc from './startGoProc';

const serializeData = (data = {}) => {
  if (typeof data === 'string') return data;
  return JSON.stringify(data);
};

export class RabbitModule extends Module {
  startGoProc = startGoProc;
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
  }
  async createConnection() {
    const { socketOptions = {} } = this.config;
    const connection = await amqp.connect(this.config.uri, socketOptions);
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
      this.listenChannel.prefetch(prefetchCount);
    }
    if (this.isGoTransport) {
      this.startGoProc();
    }
    this.log.debug('connected');
  }
  async run() {
    if (!this.enabled) return;
    await super.run();
    await this.connect();
  }
  onOpen() {}
  async ack(msg, { allUpTo } = {}) {
    return this.listenChannel.ack(msg, allUpTo);
  }
  async nack(msg, { allUpTo, requeue } = {}) {
    return this.listenChannel.nack(msg, allUpTo, requeue);
  }
  async parse() {
    throw 'not implemented worker.parse()';
  }
  async queue(name) {
    if (!this.queues[name]) throw new Err('rabbit.queueNotFound', { data: { name } });
    await this.assertQueueOnce(this.queues[name]);
    return this.queues[name];
  }
  getQueueName(queue) {
    let queueName = queue;
    if (typeof queue === 'string') {
      queueName = queue;
    } else {
      queueName = queue.name || queue.queue;
    }
    const res = this.queues[queueName] ? this.queues[queueName].queue : queueName;
    // console.log({ queueName, res });
    return res;
  }
  assertQueues = {};
  async assertQueueOnce(queue) {
    const queueName = this.getQueueName(queue);
    if (this.assertQueues[queueName]) return false;
    const res = await this.assertQueue(queue);
    this.assertQueues[queueName] = new Date();
    return res;
  }
  async assertQueue(queue) {
    const queueName = this.getQueueName(queue);
    // console.log({ queue, queueName });
    if (!queueName) {
      this.log.error('!queueName', { queue, queueName });
      throw new Err('!queueName', { queue, queueName });
    }
    const options = get(this.config, 'options');
    this.log.trace(`assertQueue(${queueName})`, omit(options, ['prefetch']));
    const res = await this.listenChannel.assertQueue(queueName, options);
    return res;
  }
  assertExchange(exchange, type = 'direct', options = {}) {
    return this.listenChannel.assertExchange(exchange, type, options);
  }
  publish(exchange, key, msg, options = {}) {
    const row = serializeData(msg);
    return this.listenChannel.publish(exchange, key, Buffer.from(row), options);
  }
  bindQueue(queue, source, pattern, ...args) {
    return this.listenChannel.bindQueue(queue, source, pattern, ...args);
  }
  sendToQueue(queue, data, options, channel = this.sendChannel) {
    const queueName = this.getQueueName(queue);
    return new Bluebird((res, rej) => {
      const row = serializeData(data);
      channel.sendToQueue(queueName, Buffer.from(row), options, (err, ok) => {
        if (err) {
          rej(err);
        } else {
          res(ok);
        }
      });
    });
  }

  async sendToQueueNative(queue, data) {
    const queueName = this.getQueueName(queue);
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
  async consume(q, callback, options) {
    const prefetchCount = get(this.config, 'options.prefetch');
    if (!prefetchCount) {
      this.log.warn(`[${q}] prefetch == 0, rabbit.consume ignore`);
      return null;
    }
    const data = await this.listenChannel.consume(q, callback, options);
    this.consumerTag = data.consumerTag;
    return data;
    // await Bluebird.delay(1000);
    // this.consumerTag = data.consumerTag;
    // console.log({ consumerTag: this.consumerTag });
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
}

export default RabbitModule;
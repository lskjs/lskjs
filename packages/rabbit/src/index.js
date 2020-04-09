import merge from 'lodash/merge';
import get from 'lodash/get';
import amqp from 'amqplib';

export default ({ config }) => class RabbitModule {
  async init() {
    this.enabled = false;
    if (!config.rabbit) return;
    this.enabled = true;
    this.defaultConfig = {
      uri: 'amqp://localhost',
    };
    this.config = merge({}, this.defaultConfig, config.rabbit);
  }
  async createConnection() {
    const connection = await amqp.connect(this.config.uri);
    return connection;
  }
  async run() {
    if (!this.enabled) return;
    this.listenConnection = await this.createConnection();
    this.sendConnection = await this.createConnection();
    this.listenChannel = await this.listenConnection.createChannel();
    this.sendChannel = await this.sendConnection.createConfirmChannel();
    this.onOpen();
  }
  onOpen() {}
  ack(msg) {
    return this.listenChannel.ack(msg);
  }
  nack(msg) {
    return this.listenChannel.nack(msg);
  }
  async assertQueue(q) {
    const prefetchCount = get(config, 'rabbit.options.prefetch');
    if (prefetchCount) {
      this.listenChannel.prefetch(prefetchCount);
    }
    const res = await this.listenChannel.assertQueue(q, get(config, 'rabbit.options'));
    return res;
  }
  sendToQueue(q, data, options, channel = this.sendChannel) {
    return new Promise((res, rej) => {
      let str = data;
      if (typeof data !== 'string') {
        str = JSON.stringify(data);
      }
      channel.sendToQueue(q, Buffer.from(str), options, (err, ok) => {
        if (err) {
          rej(err);
        } else {
          res(ok);
        }
      })
    });
  }
  consume(q, callback, options) {
    return this.listenChannel.consume(q, callback, options);
  }
};

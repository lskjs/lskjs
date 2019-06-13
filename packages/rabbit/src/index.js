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
  async run() {
    if (!this.enabled) return;
    const connection = await amqp.connect(this.config.uri);
    this.channel = await connection.createChannel();
    this.onOpen();
  }
  onOpen() {}
  ack(msg) {
    return this.channel.ack(msg);
  }
  async assertQueue(q) {
    await this.channel.assertQueue(q, get(config, 'rabbit.options'));
    const prefetchCount = get(config, 'rabbit.options.prefetch');
    if (prefetchCount) {
      await this.channel.prefetch(prefetchCount);
    }
  }
  sendToQueue(q, data, options) {
    let str = data;
    if (typeof data !== 'string') {
      str = JSON.stringify(data);
    }
    return this.channel.sendToQueue(q, Buffer.from(str), options);
  }
  consume(q, callback, options) {
    return this.channel.consume(q, callback, options);
  }
};

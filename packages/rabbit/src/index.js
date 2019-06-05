import merge from 'lodash/merge';
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
  assertQueue(q, params) {
    return this.channel.assertQueue(q, params);
  }
  sendToQueue(q, data) {
    let str = data;
    if (typeof data !== 'string') {
      str = JSON.stringify(data);
    }
    return this.channel.sendToQueue(q, Buffer.from(str));
  }
  consume(q, callback) {
    return this.channel.consume(q, callback);
  }
};

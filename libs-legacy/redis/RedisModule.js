import Err from '@lskjs/err';
import Module from '@lskjs/module';
import Bluebird from 'bluebird';

const redis = Bluebird.promisifyAll(require('redis'));

export class RedisModule extends Module {
  async init() {
    await super.init();
    if (!this.config.host) throw new Err('!config.host');
    if (!this.config.port) throw new Err('!config.port');
    this.client = redis.createClient(this.config);
    this.subscriber = redis.createClient(this.config);
    this.publisher = redis.createClient(this.config);
    this.client.on('error', (err) => {
      this.log.error('[client]', err);
    });
    this.subscriber.on('error', (err) => {
      this.log.error('[subscriber]', err);
    });
    this.publisher.on('error', (err) => {
      this.log.error('[publisher]', err);
    });
  }
  async get(key) {
    return this.client.getAsync(key);
  }
  async set(key, value) {
    return this.client.setAsync(key, value);
  }
  // TODO: подумать к чему это приведет (переопределение on)
  on(channel, callback) {
    if (!this.enabled) return false;
    this.subscriber.on('message', (ch, message) => {
      if (channel === ch) {
        callback(message);
      }
    });
    this.subscriber.subscribe(channel);
  }
  async publish(channel, message) {
    return this.publisher.publishAsync(channel, message);
  }
}

export default RedisModule;

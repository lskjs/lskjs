import Err from '@lskjs/err';
import Module from '@lskjs/module';
import Bluebird from 'bluebird';
import { Kafka, logLevel } from 'kafkajs';
import chunk from 'lodash/chunk';
import get from 'lodash/get';
import last from 'lodash/last';

export class KafkaModule extends Module {
  Kafka = Kafka;
  defaultGroupId = 'kafka-module';

  async init() {
    await super.init();
    this.config = {
      logLevel: logLevel.ERROR,
      clientId: get(process, 'env.WORKER', `nodejs_${get(process, 'env.USER')}`),
      ...(this.app.config.kafka || {}),
    };
    if (!this.config.brokers) {
      this.log.warn('!config.brokers');
      return;
    }
    this.log.debug('config', this.config);
    this.client = new this.Kafka(this.config);
  }

  async insert(...args) {
    /**
     * TODO:
     * - return promise
     * - wait 1k or 10sec (задается в конфигах)
     * - send batch
     * - then resolve all promises
     */
    if (!this.producer) throw new Err('!producer');
    return this.producer.send(...args);
  }
  async createConsumer(topic, { groupId } = {}) {
    if (!topic) throw new Err('!topic');
    const consumer = this.client.consumer({
      groupId: groupId || this.defaultGroupId,
      maxBytesPerPartition: 4096,
    });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    return consumer;
  }
  async consume(topic, onConsume, { concurrency, ...options }) {
    const consumer = await this.createConsumer(topic, options);
    await consumer.run({
      partitionsConsumedConcurrently: 1, // сколько partiotions может сразу слушать consumer
      eachBatch: (props) => this.onEachBatchMessage(props, { concurrency }),
    });
  }
  async onEachBatchMessage(options = {}, { concurrency = 1 } = {}) {
    const { batch, resolveOffset, heartbeat } = options;
    return Bluebird.mapSeries(chunk(batch.messages, concurrency), async (messages) => {
      const res = await Bluebird.map(messages, async (msg) => this.onConsume(msg, options));
      await resolveOffset(last(messages).offset);
      await heartbeat();
      return res;
    });
  }

  async run() {
    if (!this.client) return;
    await super.run();
    this.producer = this.client.producer();
    await this.producer.connect();
  }
}

export default KafkaModule;

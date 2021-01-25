import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
import { Kafka, logLevel } from 'kafkajs';
import get from 'lodash/get';

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
    if (!this.producer) throw '!producer';
    return this.producer.send(...args);
  }
  async createConsumer({ groupId, topic } = {}) {
    if (!topic) throw new Err('!topic');
    const consumer = this.client.consumer({
      groupId: groupId || this.defaultGroupId,
      maxBytesPerPartition: 4096,
    });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    return consumer;
  }
  async run() {
    if (!this.client) return;
    await super.run();
    this.producer = this.client.producer();
    await this.producer.connect();
    const admin = this.client.admin();
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: 'instagram_channel_events',
          numPartitions: 36,
          replicationFactor: 2,
        },
      ],
    });
  }
}

export default KafkaModule;

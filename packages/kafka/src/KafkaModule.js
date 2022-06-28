import Err from '@lskjs/err';
import Module from '@lskjs/module';
import Bluebird from 'bluebird';
import { Kafka, logLevel as logLevels } from 'kafkajs';
import chunk from 'lodash/chunk';
import get from 'lodash/get';
import last from 'lodash/last';

const toLskLogLevel = (level) => {
  switch (level) {
    case logLevels.ERROR:
      return 'error';
    case logLevels.WARN:
      return 'warn';
    case logLevels.INFO:
      return 'info';
    case logLevels.DEBUG:
      return 'debug';
    case logLevels.NOTHING:
      return 'trace';
    default:
      return 'trace';
  }
};
export class KafkaModule extends Module {
  Kafka = Kafka;
  defaultGroupId = 'kafka-module';

  getOptions() {
    const logLevel = get(this.config, 'log.level') || logLevels.ERROR;
    const logger = this.log.createChild({ ns: `${this.log.ns}:client`, name: null });
    const options = {
      logLevel,
      ...this.config,
      logCreator:
        () =>
         ({ namespace, level, log: { message, ...info } }) => { //eslint-disable-line
          const lskLevel = toLskLogLevel(level);
          const args = [message];
          if (level === logLevels.WARN || level === logLevels.ERROR) args.push(info);
          const { name } = logger;
          logger.name = namespace; // TODO: bad practrice
          logger[lskLevel](...args);
          logger.name = name;
          // this.log[lskLevel](`[${namespace}]`, message, info);
        },
    };
    if (!options.clientId) options.clientId = get(process, 'env.WORKER', `nodejs_${get(process, 'env.USER')}`);
    return options;
  }
  async init() {
    await super.init();
    if (!this.config.brokers) {
      this.log.warn('!config.brokers');
      return;
    }
    const options = this.getOptions();
    this.log.debug('[options]', options);
    this.client = new this.Kafka(options);
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
      eachBatch: (props) => this.onEachBatchMessage(onConsume, props, { concurrency }),
    });
  }
  async onEachBatchMessage(onConsume, options = {}, { concurrency = 1 } = {}) {
    if (!onConsume) throw new Err('!onConsume');
    const { batch, resolveOffset, heartbeat } = options;
    return Bluebird.mapSeries(chunk(batch.messages, concurrency), async (messages) => {
      const res = await Bluebird.map(messages, async (msg) => {
        this.log.trace('[onConsume] start', msg);
        const res2 = await onConsume(msg, options);
        this.log.trace('[onConsume] res', res2);
        return res2;
      });
      await resolveOffset(last(messages).offset);
      await heartbeat();
      return res;
    });
  }

  nack(message, options) {
    // this.log.warn('nack', message, options);
  }
  ack(message, options) {
    // this.log.info('ack', message, options);
  }
  nackError(message, options) {
    // this.log.error('nackError', message, options);
  }
  ackError(message, options) {
    // this.log.error('ackError', message, options);
  }
  async run() {
    if (!this.client) return;
    await super.run();
    this.producer = this.client.producer();
    await this.producer.connect();
  }
}

export default KafkaModule;

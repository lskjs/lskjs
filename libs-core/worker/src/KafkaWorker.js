import tryJSONparse from '@lskjs/utils/tryJSONparse';

import { Worker } from './Worker';

export default class KafkaWorker extends Worker {
  __broker = 'kafka';
  getConsumerOptions() {
    const concurrency =
      this.config.concurrency ||
      tryJSONparse(process.env.KAFKA_CONCURRENCY) ||
      tryJSONparse(process.env.CONCURRENCY) ||
      1;
    return { concurrency };
  }

  getMsgData(msg) {
    return super.getMsgData(msg.value);
  }
  async stop() {
    await super.stop();
    if (!this.consumer) return;
    this.consumer.stop();
  }
}

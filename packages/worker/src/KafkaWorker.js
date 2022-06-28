/* eslint-disable max-classes-per-file */
import Module from '@lskjs/module';
import tryJSONparse from '@lskjs/utils/tryJSONparse';

export default class KafkaWorker extends Module {
  __broker = 'kafka';
  getConsumerOptions() {
    const concurrency =
      this.config.concurrency ||
      tryJSONparse(process.env.KAFKA_CONCURRENCY) ||
      tryJSONparse(process.env.CONCURRENCY) ||
      1;
    return { concurrency };
  }
  async stop() {
    await super.stop();
    if (!this.consumer) return;
    this.consumer.stop();
  }
}

import { RabbitWorkerJob } from './RabbitWorkerJob';

export class KafkaWorkerJob extends RabbitWorkerJob {
  debug = false;
  async init() {
    await super.init();
    this.stats = this.worker.stats;
    this.startedAt = new Date();
    this.tx = this.app.apm.startTransaction(this.name, 'job');
  }
}

export default KafkaWorkerJob;

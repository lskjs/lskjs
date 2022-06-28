import { RabbitWorkerJob } from './RabbitWorkerJob';

export class KafkaWorkerJob extends RabbitWorkerJob {
  isTooMuchRedelivered() {
    return false;
  }
}

export default KafkaWorkerJob;

import { WorkerJob } from './WorkerJob';

export class KafkaWorkerJob extends WorkerJob {
  isTooMuchRedelivered() {
    return false;
  }
}

export default KafkaWorkerJob;

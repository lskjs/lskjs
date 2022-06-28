import Err from '@lskjs/err';
import omit from 'lodash/omit';

import { Worker } from './Worker';

export class RabbitWorker extends Worker {
  __broker = 'rabbit';
  getConsumerOptions() {
    return { noAck: false };
  }
  async sendToRedelivered(job, queue, { err, baseQueue }) {
    await this.client.assertQueueOnce(queue);
    this.log.error('[sendToRedelivered]', `${baseQueue} => ${queue}`);
    const params = job?.params || {};
    const { __meta: meta = {} } = params;
    await this.client.sendToQueue(queue, {
      ...job.params,
      __meta: {
        __err: err
          ? {
              code: Err.getCode(err),
              message: Err.getMessage(err),
            }
          : null,
        ...omit(meta, ['__err']),
      },
    });
    if (this.showErrorInfo()) console.error('err1', err); // eslint-disable-line no-console
  }
}

export default RabbitWorker;

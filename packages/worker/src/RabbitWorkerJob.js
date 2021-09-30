import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';

export const apmMock = {
  startTransaction() {
    return {
      end: () => null,
      startSpan: () => ({ end: () => null }),
      addLabels: () => null,
      setLabel: () => null,
    };
  },
  async captureError() {
    return null;
  },
  setCustomContext() {
    return null;
  },
  setLabel() {
    return null;
  },
  addLabels() {
    return null;
  },
};

export class RabbitWorkerJob extends Module {
  static __worker = true;
  __worker = true;
  redeliveredCount = isDev ? null : 10;

  async init() {
    await super.init();
    if (this.worker) this.stats = this.worker.stats;
    this.startedAt = new Date();
    let apm;
    if (this.app.hasModule('apm')) {
      apm = await this.app.module('apm', { throw: false });
    }
    if (!apm) apm = apmMock;
    this.tx = apm.startTransaction(this.name, 'job');
  }
  getQueueMeta() {
    return {
      meta: {
        __name: this.name,
        ...this.params,
      },
    };
  }
  isTooMuchRedelivered() {
    if (!this.msg) return false;
    if (!this.redeliveredCount) return false;
    return this.msg.fields.redelivered && this.msg.fields.deliveryTag > this.redeliveredCount;
  }

  success(res) {
    return this.result(res);
  }

  error(res) {
    return this.result(res);
  }

  result(res) {
    this.data = res;
    return res;
  }

  async onSuccess() {
    this.finishedAt = new Date();
    if (this.stats) this.stats.trigger({ event: 'success', startedAt: this.startedAt });
    if (this.tx) {
      this.tx.result = 'success';
      await this.tx.end();
    }
  }
  async onAckError(err) {
    this.err = err;
    this.finishedAt = new Date();
    if (this.stats) this.stats.trigger({ event: 'skip', startedAt: this.startedAt });
    if (this.tx) {
      this.tx.result = 'skip';
      await this.tx.end();
    }
  }
  async onError(err) {
    this.err = err;
    this.finishedAt = new Date();
    if (this.stats) this.stats.trigger({ event: 'error', startedAt: this.startedAt });
    if (this.tx) {
      // await this.apm.client.captureError(err);
      this.tx.result = 'error';
      await this.tx.end();
    }
  }
  setStatus(status) {
    this.status = status;
    return status;
  }

  /**
   * Когда всё хорошо
   */
  async ackSuccess() {
    if (this.status) {
      this.log.warn('ackSuccess ignore because has status');
      return this.status;
    }
    await this.onSuccess();
    if (this.debug) this.log.trace('rabbit.ack');
    if (this.msg) await this.rabbit.ack(this.msg);
    return this.setStatus({
      status: 'success',
      action: 'ack',
    });
  }
  /**
   * Когда всё плохо
   */
  async nackError(err) {
    if (this.status) {
      this.log.warn('nackError ignore because has status');
      return this.status;
    }
    await this.onError(err);
    if (this.debug) this.log.error(`rabbit.nack [${Err.getCode(err)}]`, this.params);
    if (this.msg && this.worker.consumerTag === this.msg.fields.consumerTag) {
      await this.rabbit.nack(this.msg, { requeue: true });
    }
    return this.setStatus({
      status: 'error',
      action: 'nack',
    });
  }
  /**
   * Когда ошибка заебала, и больше это сообщение не нужно в очереди (например при множественно redelivered)
   */
  async ackError(err) {
    if (this.status) {
      this.log.warn('ackError ignore because has status');
      return this.status;
    }
    await this.onAckError(err);
    if (this.debug) this.log.trace(`rabbit.ackError [${Err.getCode(err)}]`);
    if (this.msg) await this.rabbit.nack(this.msg, { requeue: false });
    return this.setStatus({
      status: 'error',
      action: 'nack',
      requeue: false,
    });
  }
  /**
   * Хз когда эта хрень нужна, просто добавил для консистентности
   * напишу throw, если вдруг кому-то реально понадобится -- пинганите меня
   * @isuvorov
   */
  async nackSuccess() {
    throw new Err('ХЗ КОМУ ЭТА ХРЕНЬ НУЖНА, ПИНГАНИТЕ МЕНЯ');
    // this.log.trace('rabbit.nack (success)');
    // await this.onError(err);
    // if (this.msg) await this.rabbit.nack(this.msg);
    // return {
    //   status: 'success',
    //   action: 'nack',
    // };
  }
}

export default RabbitWorkerJob;

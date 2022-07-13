import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';
// , { IModule, IModuleWithApp }

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

// export interface IRabbitWorker extends IModule {
//   name?: string;
//   stats?: any;
// }
// export interface IWorkerJob extends IModule {
//   worker?: IRabbitWorker;
//   stats?: any;
//   startedAt: Date,
//   tx: any,
// }

// implements IWorkerJob
export class WorkerJob extends Module {
  static __worker = true;
  __worker = true;
  redeliveredCount = isDev ? null : 10;

  async _run() {
    if (!this.__lifecycle.runStart) {
      throw new Err('MODULE_INVALID_LIVECYCLE_RUN', 'use module.__run() instead module.run()', {
        data: { name: this.name },
      });
    }
    // try {
    await this.run();
    // } catch (err) {
    //   safeLog(this, 'fatal', 'run()', err);
    //   throw err;
    // }
  }

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
      __meta: {
        __name: this.name,
        __date: Date.now(),
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
    if (this.debug) this.log.trace('[ack]');
    if (this.msg) await this.client.ack(this.msg);
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
    // if (this.debug) this.log.error(`rabbit.nack [${Err.getCode(err)}]`, this.params);
    if (this.debug) this.log.error(`[nack] ${Err.getCode(err)}`);
    if (this.msg && this.worker.consumerTag === this.msg.fields.consumerTag) {
      await this.client.nack(this.msg, { requeue: true });
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
    if (this.debug) this.log.trace(`[ackError] ${Err.getCode(err)}`);
    if (this.msg) await this.client.nack(this.msg, { requeue: false });
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
    // if (this.msg) await this.client.nack(this.msg);
    // return {
    //   status: 'success',
    //   action: 'nack',
    // };
  }
}

export default WorkerJob;

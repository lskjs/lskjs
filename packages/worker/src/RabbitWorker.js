import Err from '@lskjs/err';
import Stats from '@lskjs/stats';
import { isDev } from '@lskjs/utils/env';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { Worker } from './Worker';

export class RabbitWorker extends Worker {
  showErrorInfo() {
    return false; // // this.debug
  }
  async onConsumeError({ err, job }) {
    const errInfo = this.app && this.app.getErrorInfo ? this.app.getErrorInfo(err) : {};
    if (this.showErrorInfo()) this.log.trace('onConsumeError errInfo', errInfo);
    const isApm = get(errInfo, 'apm', true);
    const isNack = get(errInfo, 'nack', true);
    const isTelegram = get(errInfo, 'telegram', true);
    const log = get(errInfo, 'log', 'error');

    if (err && err.code === 'RABBIT_TIMEOUT') {
      await job.nackSuccess(); // TODO: я не правильно юзаю эту хрень
      const { rabbitTimeout = 10000 } = this.config.rabbitTimeout;
      this.log.trace('rabbitTimeout', rabbitTimeout, '[delay]');
      await Bluebird.delay(rabbitTimeout);
      return;
    }
    if (errInfo.timeout) {
      this.log.trace('err.timeout', errInfo.timeout, '[delay]');
      await Bluebird.delay(errInfo.timeout);
    }
    if (log && this.log[log]) {
      const code = Err.getCode(err);
      let message; //= Err.getMessage(err);
      if (code === message) message = null;
      this.log[log](...[code, message].filter(Boolean));
    }
    if (isTelegram) {
      this.onTelegramError({ err, job });
    }
    if (isApm && this.app.hasModule('apm')) {
      const apm = await this.app.module('apm');
      try {
        apm.captureError(err);
      } catch (apmErr) {
        this.log.error('apm.captureError', apmErr);
      }
    }
    if (!isNack) {
      if (this.showErrorInfo()) console.error('err4', err); // eslint-disable-line no-console
      await job.ackError(err);
      return;
    }
    // isNack
    if (errInfo.redelivered && job.isTooMuchRedelivered()) {
      const routingKey = get(job, 'msg.fields.routingKey');
      const queue = `${routingKey}_redelivered`;
      try {
        await this.rabbit.assertQueueOnce(queue);
        // this.rabbit.consume(this.queue, this.onConsume.bind(this), { noAck: false });
        this.log.error('isTooMuchRedelivered', `${routingKey} => ${queue}`);
        const { meta = {} } = job.params;
        await this.rabbit.sendToQueue(queue, {
          ...job.params,
          meta: {
            ...meta,
            __err: {
              code: Err.getCode(err),
              message: Err.getMessage(err),
            },
          },
        });
        if (this.showErrorInfo()) console.error('err1', err); // eslint-disable-line no-console
        await job.ackError(err);
      } catch (err2) {
        this.log.error('cant re-redeliver', err2, isDev ? err2.stack : '');
        await job.nackError(err);
      }
      return;
    }
    if (this.showErrorInfo()) console.error('err3', err); // eslint-disable-line no-console
    await job.nackError(err);
  }
  async onConsume(msg) {
    this.stats.print({
      log: this.log.info.bind(this.log),
      successKey: 'event.success',
      unsuccessKey: 'event.error',
    });
    if (msg === null) return;
    let params;
    try {
      params = JSON.parse(msg.content.toString());
    } catch (err) {
      const str = msg.content.toString();
      if (isDev) {
        this.log.error('[ignore] cant parse json', str);
      } else {
        this.log.error('[ignore] cant parse json ');
        this.onTelegramError({ err: 'cant parse json', job: { params: str } });
      }
      await this.rabbit.nack(msg, { requeue: false });
      return;
    }
    const job = this.Job.new({
      '__lifecycle.create': new Date(),
      msg,
      params,
      worker: this,
      __parent: this,
      app: this.app,
      rabbit: this.rabbit,
      config: await this.getJobConfig(),
    });
    try {
      await job.start();
      if (!job.status) {
        await job.ackSuccess();
      }
    } catch (error) {
      if (this.showErrorInfo()) {
        this.log.error('-----------\n', error, '\n-----------'); // eslint-disable-line no-console
        this.log.error('-----------\n', error.stack, '\n-----------'); // eslint-disable-line no-console
      }

      try {
        const errorParams = pick(error, 'nack', 'es', 'telegram', 'log');
        const err = new Err(error, errorParams);
        const { delay = isDev ? 10000 : 0 } = this.config.options || {};
        if (delay) {
          this.log.warn('[delay] 10000');
          await Bluebird.delay(10000);
        }
        if (job) {
          await this.onConsumeError({ err, job, msg });
        } else {
          // this.msg;
        }
      } catch (err2) {
        this.log.error('error while onError', err2);
      }
    }
  }
  async connect() {
    const statsProps = {};
    statsProps.debug = this.log.trace.bind(this.log);
    this.stats = await Stats.create(statsProps);
    if (this.stats) this.stats.startTimer();
    this.rabbit = await this.app.module('rabbit');
    const queue = this.config.queue || this.queue;
    if (!queue) {
      this.log.warn('!queue', 'connect');
      return;
    }
    const queueName = this.rabbit.getQueueName(queue);
    await this.rabbit.queue(queueName);
    const onConsume = this.onConsume.bind(this);
    // const onConsume = (...args) => {
    //   console.log(99991111);
    //   await this.onConsume(...args);
    //   console.log(99992222);
    // };
    const data = await this.rabbit.consume(queueName, onConsume, { noAck: false });
    this.consumerTag = data.consumerTag;
  }
  async run() {
    await super.run();
    const queue = this.config.queue || this.queue;
    if (!queue) {
      this.log.warn('!queue');
      return;
    }
    if (!this.Job) {
      this.log.warn('!Job', this.Job);
      return;
    }
    if (this.config.autoconnect) {
      this.log.debug('autoconnect');
      await this.connect();
    }
  }
  async stop() {
    await super.stop();
    return this.rabbit.stop();
  }
}

export default RabbitWorker;

import Err from '@lskjs/err';
import Module from '@lskjs/module';
import Stats from '@lskjs/stats';
import { isDev } from '@lskjs/utils/env';
import tryJSONparse from '@lskjs/utils/tryJSONparse';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { createTelegramMessage } from './utils/createTelegramMessage';

export class Worker extends Module {
  static __worker = true;
  __worker = true;
  showErrorInfo() {
    return false; // // this.debug
  }
  async getConfig() {
    return {
      autoconnect: true,
      ...(await super.getConfig()),
    };
  }
  async getJobConfig() {
    const mConfig = await this.getModuleConfig('job');
    const res = {
      ...(mConfig || {}),
      ...(this.config || {}),
      log: {
        ...(mConfig?.log || {}),
        ...(this.config?.log || {}),
        ns: [this.config?.log?.ns, 'job'].filter(Boolean).join('.'),
      },
    };
    return res;
  }
  async parse() {
    throw new Err('NOT_IMPLEMENTED', 'not implemented worker.parse()');
  }
  async onTelegramError({ err, job }) {
    if (this.app.hasModule('rlog')) {
      const rlog = await this.app.module('rlog');
      rlog.error(createTelegramMessage({ name: this.name, err, job }));
    }
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
      params = this.getMsgData(msg, 'content');
    } catch (err) {
      await this.client.nack(msg, { requeue: false });
      return;
    }
    const job = await this.createJob({ msg, params });
    try {
      await job.start();
      if (!job.status) await job.ackSuccess();
    } catch (err) {
      await this.onConsumeError(err, { job, msg });
    }
  }
  async onConsumeError(error, { job }) {
    if (this.showErrorInfo()) {
      this.log.error('-----------\n', error, '\n-----------'); // eslint-disable-line no-console
      this.log.error('-----------\n', error.stack, '\n-----------'); // eslint-disable-line no-console
    }
    let err;
    try {
      const errorParams = pick(error, 'nack', 'es', 'telegram', 'log');
      err = new Err(error, errorParams);
      const { delay = isDev ? 10000 : 0 } = this.config.options || {};
      if (delay) {
        this.log.warn('[delay] 10000');
        await Bluebird.delay(10000);
      }
    } catch (err2) {
      this.log.error('error while onError', err2);
    }
    if (!job) return;
    const errInfo = this.app && this.app.getErrorInfo ? this.app.getErrorInfo(err) : {};
    if (this.showErrorInfo()) this.log.trace('onConsumeError errInfo', errInfo);
    const isApm = get(errInfo, 'apm', true);
    const isNack = get(errInfo, 'nack', true);
    const isTelegram = get(errInfo, 'telegram', true);
    const log = get(errInfo, 'log', 'error');

    const timeout =
      errInfo.timeout || tryJSONparse(process.env.AMQP_ERROR_TIMEOUT) || tryJSONparse(process.env.ERROR_TIMEOUT);
    const doTimeout = async () => {
      if (timeout) {
        this.log.trace('[err.timeout]', timeout, '[delay]');
        await Bluebird.delay(timeout);
      }
    };

    if (log && this.log[log]) {
      const code = Err.getCode(err);
      let message; //= Err.getMessage(err);
      if (code === message) message = null;
      this.log[log](...[code, message].filter(Boolean));
    }
    await doTimeout();
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
    if (errInfo.redelivered && job.isTooMuchRedelivered && job.isTooMuchRedelivered()) {
      const fromQueue = this.getQueue();
      const queue = `${fromQueue}_redelivered`;
      if (this.sendToRedelivered) await this.sendToRedelivered(job, queue, { fromQueue });
      return;
    }
    if (this.showErrorInfo()) console.error('err3', err); // eslint-disable-line no-console
    await job.nackError(err);
  }
  async initStats() {
    const statsProps = {};
    statsProps.debug = this.log.trace.bind(this.log);
    this.stats = await Stats.create(statsProps);
    if (this.stats) this.stats.startTimer();
  }
  getQueue() {
    return this.config.queue || this.queue || this.config.topic || this.topic;
  }
  getMsgData(msg) {
    try {
      return JSON.parse(msg.toString());
    } catch (err) {
      const str = msg.toString();
      if (isDev) {
        this.log.error('[ignore] cantParseJSON', str);
      } else {
        this.log.error('[ignore] cantParseJSON ');
        this.onTelegramError({ err: 'cantParseJSON', job: { params: str } });
      }
      throw new Err('catntParseJSON', { str });
    }
  }
  getConsumerOptions() {
    return {};
  }
  async connect() {
    this.client = await this.app.module(this.__broker);
    const queue = this.getQueue();
    if (!queue) {
      this.log.warn('!queue || !topic');
      return null;
    }
    const onConsume = this.onConsume.bind(this);
    this.consumer = await this.client.consume(queue, onConsume, this.getConsumerOptions());
    return this.consumer;
  }
  async run() {
    await super.run();
    const queue = this.getQueue();
    if (!queue) {
      this.log.warn('!queue || !topic');
      return;
    }
    if (!this.Job) {
      this.log.warn('!Job', this.Job);
      return;
    }
    if (this.config.autoconnect) {
      this.log.debug('autoconnect');
      await this.initStats();
      await this.connect();
    }
  }
  async createJob(props = {}) {
    const mergedProps = {
      '__lifecycle.create': new Date(),
      worker: this,
      __parent: this,
      app: this.app,
      config: await this.getJobConfig(),
      ...props,
    };
    if (this.client) {
      mergedProps.client = this.client;
      if (this.__broker) mergedProps[this.__broker] = this.client;
    }
    return this.Job.new(mergedProps);
  }
  async process(params, props = {}) {
    const job = await this.createJob({ ...props, params });
    const instance = await job.start();
    return {
      code: instance.err ? Err.getCode(instance.err) : 0,
      ...instance.getQueueMeta(),
      startedAt: instance.startedAt,
      finishedAt: instance.finishedAt,
      runningTime: instance.finishedAt ? instance.finishedAt - instance.startedAt : null,
      status: instance.status,
      data: instance.data,
      err: instance.err,
    };
  }
  async stop() {
    await super.stop();
    return this.client.stop();
  }
}

export default Worker;

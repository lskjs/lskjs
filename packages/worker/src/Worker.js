import Err from '@lskjs/err';
import Module from '@lskjs/module';

import { createTelegramMessage } from './utils/createTelegramMessage';

export class Worker extends Module {
  static __worker = true;
  __worker = true;
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
  async process(params) {
    const instance = await this.Job.start({
      __parent: this,
      app: this.app,
      params,
      worker: this,
      rabbit: this.rabbit,
      config: await this.getJobConfig(),
    });

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
}

export default Worker;

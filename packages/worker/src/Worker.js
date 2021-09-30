import Err from '@lskjs/err';
import Module from '@lskjs/module';
import prettyStringify from '@lskjs/utils/prettyStringify';

export class Worker extends Module {
  static __worker = true;
  __worker = true;
  async getConfig() {
    return {
      autoconnect: true,
      ...(await super.getConfig()),
    };
  }
  async parse() {
    throw new Err('NOT_IMPLEMENTED', 'not implemented worker.parse()');
  }
  async onTelegramError({ err, job }) {
    const { params } = job || {};
    let code = Err.getCode(err);
    let message = Err.getMessage(err);
    if (code === message) message = null;
    if (code) code = `[${code}]`;
    let worker = process.env.SERVICE || this.name;
    if (worker) worker = `<${worker}>`;
    const str = [
      worker,
      code,
      message,
      err.data && JSON.stringify(err && err.data, null, 2),
      '\n',
      prettyStringify(params),
    ]
      .filter(Boolean)
      .join('\n');
    // console.log(66666);
    // const str = `\n${err.code}\n${err.message || ''}\n\n${JSON.stringify(params)}\n\n/api/${this.name}?${toQs(params)}`;
    if (this.app.hasModule('rlog')) {
      const rlog = await this.app.module('rlog');
      rlog.error(str);
    }
  }
  async process(params) {
    const instance = await this.Job.start({
      __parent: this,
      app: this.app,
      params,
      worker: this,
      rabbit: this.rabbit,
      config: this.config,
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

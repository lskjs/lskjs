import { isDev } from '@lskjs/env';
import BaseApi from '@lskjs/server-api';

export class RlogApi extends BaseApi {
  getRoutes() {
    return {
      '/send': this.send.bind(this),
    };
  }
  async send(req) {
    const rlog = await this.app.module('rlog');
    const { level, msg, options = {} } = req.data;
    const fn2 = this.log[level] || this.log.trace;
    await fn2.call(this.log, '[send]', msg, options);
    const fn = rlog[level] || rlog.send;
    const res = await fn.call(rlog, msg, options);
    if (isDev) return res;
    return {
      ok: 1,
    };
  }
}

export default RlogApi;

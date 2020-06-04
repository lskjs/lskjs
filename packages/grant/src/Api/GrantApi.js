import Api from '@lskjs/server-api';
import isPlainObject from 'lodash/isPlainObject';

export default class GrantApi extends Api {
  getRoutes() {
    return {
      '/can': ::this.can,
      '/batch': ::this.batch,
    };
  }
  async check(rule, userId) {
    const grant = await this.app.module('grant');
    if (!isPlainObject(rule)) throw 'data is not object';
    if (rule.userId && rule.userId !== userId) {
      // eslint-disable-next-line no-console
      console.log('ALARMAAAAAA ALARMAAAAAAALARMAAAAAAALARMAAAAAA -- userId is changed');
    }
    const res = await grant.can({
      ...rule,
      userId,
    });
    return res;
  }
  async can(req) {
    const userId = req.user && req.user._id;
    return this.check(req.data, userId);
  }
  async batch(req) {
    const userId = req.user && req.user._id;
    const { rules } = req.data;
    return Promise.map(rules, (rule) => this.check(userId, rule));
  }
}

import Api from '@lskjs/server-api';
import isPlainObject from 'lodash/isPlainObject';
import get from 'lodash/get';
import Cache from '../Cache';

export default class GrantApi extends Api {
  getRoutes() {
    return {
      '/can': ::this.can,
      '/canGroup': ::this.canGroup,
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
  async checkGroup(rules, userId) {
    const grant = await this.app.module('grant');
    // if (!isPlainObject(rule)) throw 'data is not object';
    // if (rule.userId && rule.userId !== userId) {
    //   // eslint-disable-next-line no-console
    //   console.log('ALARMAAAAAA ALARMAAAAAAALARMAAAAAAALARMAAAAAA -- userId is changed');
    // }
    const _rules = rules.map((rule) => {
      return {
        ...rule,
        userId,
      };
    });
    const cache = new Cache();
    return grant.canGroup(_rules, cache);
  }
  async can(req) {
    const userId = req.user && req.user._id;
    return this.check(req.data, userId);
  }
  async canGroup(req) {
    // return console.log(req.data);
    const userId = req.user && req.user._id;
    const data = get(req.data, 'data', []);
    if (!Array.isArray(data)) throw 'data is not array';
    return this.checkGroup(data, userId);
  }
  async batch(req) {
    const userId = req.user && req.user._id;
    const { rules } = req.data;
    return Promise.map(rules, (rule) => this.check(userId, rule));
  }
}

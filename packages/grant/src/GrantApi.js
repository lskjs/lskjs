import Err from '@lskjs/err';
import Api from '@lskjs/server-api';

import CacheStorage from './CacheStorage';

export class GrantApi extends Api {
  cache = new CacheStorage({ name: 'GrantApi' });
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/ask': this.ask.bind(this),
      '/clearCache': this.clearCache.bind(this),
    };
  }
  async ask(req) {
    const {
      data: { rules },
    } = req;
    if (rules && Array.isArray(rules) && rules.length > 0) throw new Err('grant.askFormat', 'rules is not array');
    const grant = await this.app.module('grant');
    const userId = (req.user && req.user.id) || 'guest';
    return grant.canGroup(rules, {
      user: req.user,
      cache: this.cache.fork({ prefix: userId }),
    });
  }
  async clearCache(req) {
    const userId = (req.user && req.user.id) || 'guest';
    return this.cache.clearCache(`${userId}.*`);
  }
}

export default GrantApi;

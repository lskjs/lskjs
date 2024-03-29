import Err from '@lskjs/err';
import Api from '@lskjs/server-api';

export class GrantApi extends Api {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/can': () => {
        throw new Err('DEPRECATED');
      },
      '/canGroup': () => {
        throw new Err('DEPRECATED');
      },
      '/ask': this.ask.bind(this),
      '/cache': this.cache.bind(this),
      '/clearCache': this.clearCache.bind(this),
    };
  }
  async ask(req) {
    let { rules, clearCache } = req.data;
    clearCache = !!+clearCache;
    const { action } = req.data;
    if (!(rules && Array.isArray(rules) && rules.length > 0)) {
      if (action) {
        rules = [{ action }];
      } else {
        throw new Err('grant.askFormat', 'rules is not array', { rules });
      }
    }
    const grant = await this.app.module('grant');
    const userId = req.user ? req.user._id : null;
    const prefix = userId || 'guest';
    if (clearCache) {
      // eslint-disable-next-line no-shadow
      await grant.clearCache(rules.forEach(({ action }) => `${prefix}.${action}`));
    }
    return grant.canGroup(rules, {
      user: req.user,
      userId,
      cache: grant.__cache.fork({ prefix }),
    });
  }
  async cache(req) {
    await this.checkAdmin(req);
    const grant = await this.app.module('grant');
    return grant.__cache.data;
  }
  async clearCache(req) {
    const grant = await this.app.module('grant');
    const userId = (req.user && req.user._id) || 'guest';
    const path = [userId, req.data.path || '*'].filter(Boolean).join('.');
    return grant.clearCache(path);
  }
}

export default GrantApi;

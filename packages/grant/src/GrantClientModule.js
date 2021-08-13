// import CacheStorage from './CacheStorage';
import Err from '@lskjs/err';
import get from 'lodash/get';
import some from 'lodash/some';

import { GrantModule } from './GrantModule';

const getServerApp = (app) => app && app.app && app.app.app;

export class GrantClientModule extends GrantModule {
  async can(...args) {
    throw new Err('DEPRECATED')
    // const result = await this.canGroup(...args);
    // // console.log()
    // const keys = Object.keys(result);
    // if (keys.length !== 1) throw new Err('grant.invalidResult');
    // return result[keys[0]];
  }
  async canGroup(...args) {
    // const cache = new CacheStorage({ name: 'GrantClientModule.canGroup' });
    const [rules, ctx] = await this.getArgs(...args);
    // const results = await super.canGroup(rules, { ...ctx, cache });

    // console.log('canGroup front', { rules, ctx });
    return this.ask({ rules });

    // TODO: добавить ленивость
    const results = await super.canGroup(rules, ctx);
    const isHaveNull = some(results, (r) => r === null);
    if (Object.keys(results).length === rules.length && !isHaveNull) return results;
    // NOTE: For SSR client
    if (getServerApp(this.app)) {
      const auth = await this.app.module('auth');
      const grant = await getServerApp(this.app).module('grant');
      const user = get(auth, 'store.session.user');
      return grant.canGroup(rules, { ...ctx, user });
    }
    return this.ask({ rules });
  }

  async clearCache(path) {
    await super.init();
    const api = await this.app.module('api');
    const { data } = await api.fetch('/api/grant/clearCache', {
      method: 'POST',
      data: { path },
      body: { path },
    });
    return data;
  }
  async ask({ rules } = {}) {
    // => []
    if (this.debug) this.log.trace(`Grant.ask({${rules}})`);
    const api = await this.app.module('api');
    const {
      data: { data },
    } = await api.fetch('/api/grant/ask', {
      method: 'POST',
      data: { rules },
      body: { rules },
    });
    return data;
  }
  async anyRule(action) {
    const res = await this.ask({ rules: [action] });
    console.log('anyRule', action, res);

    return res;
    // this.log.debug('empty rule', action);
    // return null;
  }
}

export default GrantClientModule;

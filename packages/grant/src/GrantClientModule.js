// import CacheStorage from './CacheStorage';
import Err from '@lskjs/err';
import get from 'lodash/get';
import some from 'lodash/some';

import { GrantModule } from './GrantModule';

const getServerApp = (app) => app && app.app && app.app.app;

export class GrantClientModule extends GrantModule {
  async can(...args) {
    const result = await this.canGroup(...args);
    const keys = Object.keys(result);
    if (keys !== 1) throw new Err('grant.invalidResult');
    return result[keys[0]];
  }
  async canGroup(...args) {
    // const cache = new CacheStorage({ name: 'GrantClientModule.canGroup' });
    const [rules, ctx] = await this.getArgs(...args);
    // const results = await super.canGroup(rules, { ...ctx, cache });
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
    return this.askServerGroup(rules);
  }
  async askServer({ rules } = {}) {
    if (this.debug) this.log.trace(`Grant.askServer(${args[0]})`);
    const api = await this.app.module('api');
    const { data } = await api.fetch('/api/grant/ask', {
      method: 'POST',
      data: { rules },
      body: { rules },
    });
    return data;
  }
}

export default GrantClientModule;

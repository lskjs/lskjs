import Module from '@lskjs/module';
import createLogger from '@lskjs/utils/createLogger';
import hashCode from '@lskjs/utils/hashCode';
import isObject from 'lodash/isObject';
import Promise from 'bluebird';
import get from 'lodash/get';
import CacheStorage from './CacheStorage';

const DEBUG = __DEV__ && false;
const debug = createLogger({ name: '@lskjs/grant', enable: DEBUG });
// && false
// [d] (Grant) can { userId: '5c59b44c18d8f218d0f803b8' }
export default class GrantModule extends Module {
  name = 'GrantModule';
  getRules() {
    return {};
  }
  test() {
    return true;
  }
  async init() {
    await super.init();
    this.rules = this.getRules();
    this.log.trace('GrantModule.rules', Object.keys(this.rules));
  }
  async getParams(args) {
    if (args.length === 1) {
      const [params = {}] = args;
      if (typeof params === 'string') {
        return { action: params };
      }
      return params;
    }
    const [userOrId, action, params = {}] = args;
    let user;
    let userId;
    if (typeof userOrId === 'string') {
      userId = userOrId;
    } else if (isObject(userOrId)) {
      user = userOrId;
      userId = userOrId._id;
    } else if (params.user) {
      ({ user } = params);
      userId = user._id;
    } else if (params.userId) {
      ({ userId } = params);
    }
    if (userId && !user) {
      user = await this.getUserByUserId(userOrId);
    }
    return {
      user,
      userId,
      action,
      ...params,
    };
  }
  getGroupParams(args) {
    return Promise.map(args, async (arg) => {
      return this.getParams([arg]);
    });
  }
  getUserByUserId(userId) {
    if (__CLIENT__) {
      return this.app.stores.UserStore.findById(userId);
    }
    return this.app.models.UserModel.findById(userId);
  }
  async hasRule(rule) {
    const { action } = await this.getParams(rule);
    return !!this.rules[action];
  }
  async can(...args) {
    const params = await this.getParams(args);
    const { action } = params;
    debug('can', action);
    const { rules } = this;
    if (rules && rules[action]) {
      if (!params.cache) {
        const cache = new CacheStorage();
        cache.name = 'can';
        params.cache = cache;
      }
      return rules[action].bind(this)(params);
    }
    return null;
  }
  async canGroup(args, cache) {
    const params = await this.getGroupParams(args);
    const { rules } = this;
    const cans = {};
    await Promise.map(
      params,
      async (data) => {
        const { action } = data;
        if (rules && rules[action]) {
          debug('can', action);
          const res = await rules[action].bind(this)({ ...data, cache });
          cans[hashCode(action)] = res;
        }
      },
      { concurrency: 10 },
    );
    return cans;
  }
  async getCache(initRules) {
    const rules = await this.canGroup(initRules);
    return {
      rules,
      can(rule) {
        const hash = hashCode(rule);
        return get(rules, hash, null);
      },
    };
  }
}

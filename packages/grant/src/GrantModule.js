import Module from '@lskjs/module';
import createLogger from '@lskjs/utils/createLogger';
import hashCode from '@lskjs/utils/hashCode';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import isObject from 'lodash/isObject';

import CacheStorage from './CacheStorage';

const DEBUG = __DEV__ && false;
const debug = createLogger({ name: '@lskjs/grant', enable: DEBUG });
// && false
// [d] (Grant) can { userId: '5c59b44c18d8f218d0f803b8' }
export default class GrantModule extends Module {
  getRules() {
    return {};
  }
  test() {
    return true;
  }
  async init() {
    await super.init();
    if (!this.rules) {
      this.rules = this.getRules();
    }
    if (this.debug) this.log.debug('rules', Object.keys(this.rules));
  }
  async getParams(args, params) {
    if (args.length === 1) {
      const [action = {}] = args;
      if (typeof action === 'string') {
        return { action, params };
      }
      return action;
    }
    return {
      action: args[0],
      params: args[1],
    };
  }
  // async getParams(args) {
  //   if (args.length === 1) {
  //     const [params = {}] = args;
  //     if (typeof params === 'string') {
  //       return { action: params };
  //     }
  //     return params;
  //   }
  //   const [userOrId, action, params = {}] = args;
  //   let user;
  //   let userId;
  //   if (typeof userOrId === 'string') {
  //     userId = userOrId;
  //   } else if (isObject(userOrId)) {
  //     user = userOrId;
  //     userId = userOrId._id;
  //   } else if (params.user) {
  //     ({ user } = params);
  //     userId = user._id;
  //   } else if (params.userId) {
  //     ({ userId } = params);
  //   }
  //   if (userId && !user) {
  //     user = await this.getUserByUserId(userOrId);
  //   }
  //   return {
  //     user,
  //     userId,
  //     action,
  //     ...params,
  //   };
  // }
  // getGroupParams(args) {
  //   return Bluebird.map(args, async (arg) => this.getParams([arg]));
  // }
  getGroupParams(data) {
    const [args, params] = data;
    return Bluebird.map(args, async (arg) => {
      if (Array.isArray(arg)) {
        return this.getParams(arg, params);
      }
      return this.getParams([arg], params);
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
    await Bluebird.map(
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
  // async getCache(initRules) {
  //   const rules = await this.canGroup(initRules);
  //   return {
  //     rules,
  //     can(rule) {
  //       const hash = hashCode(rule);
  //       return get(rules, hash, null);
  //     },
  //   };
  // }
  async getCache(...args) {
    const rules = await this.canGroup(args);
    return {
      rules,
      can(rule) {
        const hash = hashCode(rule);
        return get(rules, hash, null);
      },
    };
  }
}

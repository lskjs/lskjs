import { isServer } from '@lskjs/env';
// import { isClient, isServer } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';
import getWildcardKeys from '@lskjs/utils/getWildcardKeys';
import Bluebird from 'bluebird';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import some from 'lodash/some';

import { CacheStorage } from './CacheStorage';

const hasWildcard = (items) => some(items, (item) => item && item.indexOf('*') !== -1);
export class GrantModule extends Module {
  trustWildcard = isServer;

  async init() {
    await super.init();
    if (!this.rules) this.rules = this.getRules();
    if (this.debug) this.log.debug('rules', Object.keys(this.rules));
    this.__cache = new CacheStorage({ name: this.name });
  }
  async clearCache(path) {
    await super.init();
    if (this.debug) this.log.trace(`GrantModule.clearCache`, path);
    return this.__cache.clearCache(path);
  }
  getRules() {
    return {
      ...(this.rules || {}),
    };
  }
  anyRule(action) {
    this.log.debug('[anyRule]', 'empty rule', action);
    return null;
  }
  async getArgs(...args) {
    let action;
    let rule = {};
    let ctx = {};

    if (args.length === 1) {
      [rule] = args;
    } else if (args.length === 2) {
      [rule, ctx] = args;
    } else if (args.length === 3) {
      [action, rule, ctx] = args;
    } else {
      if (args.length) throw new Err('grant.tooMuchArgs', 'getArgs: too much args');
      throw new Err('grant.emptyArgs', 'getArgs: empty args');
    }
    if (typeof rule === 'string') {
      rule = { action: rule };
    } else if (Array.isArray(rule)) {
      rule = rule.map((ruleOrAction) => {
        if (typeof ruleOrAction === 'string') return { action: ruleOrAction };
        return ruleOrAction;
      });
    } else if (action) {
      rule.action = rule;
    }

    if (!Array.isArray(rule)) {
      rule = [rule];
    }

    // let user;
    // let userId;
    // if (rule.user) {
    //   ({ user } = rule);
    //   userId = user._id;
    // } else if (rule.userId) {
    //   ({ userId } = rule);
    // }
    // if (userId && !user) {
    //   user = await this.findUser({ _id: userId });
    // }
    // console.log(args, '=>', [rule, ctx]);
    return [rule, ctx];
    // {
    //   user,
    //   userId,
    //   action,
    //   ...params,
    // };
  }
  // findUserById({ _id } = {}) {
  //   if (isClient) {
  //     return this.app.stores.UserStore.findById(_id);
  //   }
  //   return this.app.models.UserModel.findById(_id);
  // }
  async getRule(initRule, ctx) {
    // console.log('getRule', { ctx });
    const rule = this.rules[initRule.action];
    if (!rule) return this.anyRule.call(this, initRule, ctx);
    return rule.call(this, initRule, ctx);
  }
  async can(...args) {
    const [rules, ctx] = await this.getArgs(...args);
    if (rules.length > 1) throw new Err('grant.tooMuchArgs', 'getArgs: too much args');
    if (rules.length < 1) throw new Err('grant.emptyArgs', 'getArgs: empty args');
    const [rule] = rules;
    if (this.debug) this.log.trace('can', rule.action);
    return this.getRule(rule, ctx);
  }
  async canGroup(...args) {
    // if (this.debug) this.log.trace('canGroup', args);
    // eslint-disable-next-line prefer-const
    let [rules, ctx] = await this.getArgs(...args);
    if (this.debug) this.log.trace('canGroup', rules, ctx);
    rules = (rules || []).map((e) => (typeof e === 'string' ? { action: e } : e)).filter(Boolean);
    // console.log('canGroup', { rules, ctx });
    let keys = rules.map((e) => e.action);
    if (this.debug) this.log.trace('canGroup', keys);
    // console.log('hasWildcard(keys)', keys, hasWildcard(keys));
    // console.log('getWildcardKeys(allKeys, keys)', getWildcardKeys(allKeys, keys));
    if (hasWildcard(keys) && this.trustWildcard) {
      const allKeys = Object.keys(this.rules);
      // console.log({ keys });
      keys = getWildcardKeys(allKeys, keys);
      // console.log({ allKeys, keys });
      rules = keys.map((key) => {
        const rule = rules.find((e) => {
          const ruleKey = e.action.replace('*', '');
          return key.includes(ruleKey);
        });
        return { ...rule, action: key };
      });
    }
    // TODO: сделать один any запрос на бек
    const pairs = await Bluebird.map(rules, async (rule) => [rule.action, await this.getRule(rule, ctx)], {
      concurrency: 10,
    });
    return fromPairs(pairs);

    const res = {};
    pairs.forEach((pair) => {
      Object.assign(res, pair[1]);
    });
    // console.log('canGroup22 !!!', { rules, pairs }, fromPairs(pairs), res);
    return res;
    return fromPairs(pairs);
  }
  async getCache(...initParams) {
    if (this.debug) this.log.trace('getCache', initParams);
    const rules = await this.canGroup(...initParams);
    // console.log('getCache', { rules });
    return {
      rules,
      can: (action) => {
        if (this.debug) this.log.trace('grantCache.can', action);
        if (!(action in rules)) {
          this.log.warn('?grantCache.can', 'cant find rule in grantCache', { action });
          return null;
        }
        return get(rules, action);
      },
    };
  }
}

export default GrantModule;

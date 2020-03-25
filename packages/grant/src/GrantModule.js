import Module from '@lskjs/module';
import createLogger from '@lskjs/utils/createLogger';
import isObject from 'lodash/isObject';

const DEBUG = __DEV__ && false;
const debug = createLogger({ name: '@lskjs/grant', enable: DEBUG });
// && false
// [d] (Grant) can { userId: '5c59b44c18d8f218d0f803b8' }
export default class GrantModule extends Module {
  name = 'GrantModule';
  getRules() {
    return {};
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
  getUserByUserId(userId) {
    if (__CLIENT__) {
      return this.app.stores.UserStore.findById(userId);
    }
    return this.app.models.UserModel.findById(userId);
  }
  async can(...args) {
    const params = await this.getParams(args);
    const { action } = params;
    debug('can', action);
    const { rules } = this;
    if (rules && rules[action]) {
      return rules[action].bind(this)(params);
    }
    return null;
  }
}

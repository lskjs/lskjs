import createLogger from '@lskjs/utils/createLogger';

const DEBUG = __DEV__ && false;
const debug = createLogger({ name: 'Grant', enable: DEBUG });
// && false
// [d] (Grant) can { userId: '5c59b44c18d8f218d0f803b8' }
export default class Grant {
  constructor(params = {}) {
    Object.assign(this, params);
  }
  rules = {};
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
    } else {
      user = userOrId;
      userId = userOrId._id;
    }
    if (params.user) {
      ({ user } = params);
      userId = user._id;
    } else if (params.userId) {
      ({ userId } = params);
      user = await this.getUserByUserId(params.userId);
    } else {
      user = null;
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
  async askServer({ userId, user, action, ...params }) {
    if (__SERVER__) return false;
    const { data } = await this.app.api.fetch('/api/grant/can', {
      method: 'POST',
      data: {
        action,
        userId,
        ...params,
      },
    });
    return data;
  }
  async can(...args) {
    const params = await this.getParams(args);
    const { action } = params;
    debug('can', action);
    const { rules } = this;
    if (rules && rules[action]) {
      return rules[action].bind(this)(params);
    }
    if (__CLIENT__) return this.askServer(params);
    return false;
  }
}

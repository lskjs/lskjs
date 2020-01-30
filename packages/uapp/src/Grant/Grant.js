import createLogger from '@lskjs/utils/createLogger';

const debug = createLogger({ name: 'Grant', enable: __DEV__ });
// && false

export default class Grant {
  constructor(params = {}) {
    Object.assign(this, params);
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
  async can(...args) {
    const params = await this.getParams(args);
    const { action } = params;
    debug('can', action);
    return this.askServer(params);
  }
}

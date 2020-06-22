import BaseApi from './AuthApi';

export default class Api extends BaseApi {
  async getOperation({ req, provider, params } = {}) {
    let me = req.user;
    const { UserModel } = this.app.models;
    let user;
    if (params) {
      user = await UserModel.findOne(params);
    }
    let operation;
    if (me && me._id) {
      me = await UserModel.findById(me._id);
      if (user) {
        if (provider === 'email') {
          throw 'EMAIL_HAS_BEEN_ATTACHED';
        } else if (provider === 'phone') {
          throw 'PHONE_HAS_BEEN_ATTACHED';
        } else {
          throw 'PROVIDER_HAS_BEEN_ATTACHED';
        }
      } else {
        operation = 'attach';
      }
    } else {
      me = null;
      if (user) {
        operation = 'login';
      } else {
        operation = 'signup';
      }
    }
    return operation;
  }

  async permitAction({ req, permit }) {
    const { UserModel } = this.app.models;
    const { provider } = permit.info;
    if (!provider) throw '!provider';

    if (!permit.info[provider]) throw '!permit.info[provider]';
    const params = {
      [provider]: permit.info[provider],
    };

    const operation = await this.getOperation(req, { permit, provider, params });

    let user;
    if (operation === 'signup') {
      user = new UserModel(params);
      user.editedAt = new Date();
      user.signinAt = new Date();
    } else if (operation === 'login') {
      user = await UserModel.findOne(params).sort({ createdAt: 1 });
      if (!user) throw '!user';
      user.signinAt = new Date();
    } else if (operation === 'attach') {
      if (!req.user) throw '!user';
      user = await UserModel.findById(req.user._id);
      if (!user) throw '!user';
      user[provider] = permit.info[provider];
      user.editedAt = new Date();
      const user2 = await UserModel.findOne(params);
      if (user2) throw 'HAS_BEEN_ATTACHED';
    } else {
      throw '!operation';
    }

    await permit.activate();
    await user.save();
    const token = user.generateAuthToken();
    // console.log(`auth/confirm ${user._id} ${token}`); // this.app.logger
    return {
      isNew: operation === 'signup',
      operation,
      token,
      status: await user.getStatus(),
      user: await UserModel.prepare(user, { req, view: 'extended' }),
    };
  }
}

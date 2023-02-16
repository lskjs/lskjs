import Err from '@lskjs/err';

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
          throw new Err('EMAIL_HAS_BEEN_ATTACHED');
        } else if (provider === 'phone') {
          throw new Err('PHONE_HAS_BEEN_ATTACHED');
        } else {
          throw new Err('PROVIDER_HAS_BEEN_ATTACHED');
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
    if (!provider) throw new Err('!provider');

    if (!permit.info[provider]) throw new Err('!permit.info[provider]');
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
      if (!user) throw new Err('!user');
      user.signinAt = new Date();
    } else if (operation === 'attach') {
      if (!req.user) throw new Err('!user');
      user = await UserModel.findById(req.user._id);
      if (!user) throw new Err('!user');
      user[provider] = permit.info[provider];
      user.editedAt = new Date();
      const user2 = await UserModel.findOne(params);
      if (user2) throw new Err('HAS_BEEN_ATTACHED');
    } else {
      throw new Err('!operation');
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

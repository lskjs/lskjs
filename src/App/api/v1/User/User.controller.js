import _ from 'lodash';
import Modules from '../v1.modules';

export default (ctx) => {
  const { User } = ctx.models;
  const modules = new Modules(ctx);
  const { e404, e500 } = ctx.errors;
  const controller = {};

  controller.list = async (req) => {
    try {
      modules.isAuth(req);
      const users = await User.find({});
      console.log(users);
      if (!users) {
        throw e404('Users not found!');
      }
      return users;
    } catch (error) {
      throw e500(error);
    }
  };

  controller.get = async (req) => {
    const criteria = modules.getCriteria(req);
    const user = await User.findOne(criteria);
    if (!user) {
      throw e404('User not found!');
    }
    return user;
  };

  controller.edit = async (req) => {
    try {
      modules.isAuth(req);
      const userId = req.user._id;
      const params = req.allParams();
      const user = await User.findById(userId);
      if (!user) {
        throw e404('User not found!');
      }
      ctx.log.info('params', params);
      ctx.log.info('user', user);
      Object.assign(user, _.pick(params, ['username', 'password', 'profile']));
      user.username = params.username || user.username;
      user.password = params.password || user.password;
      user.profile = _.merge({}, user.profile, params.profile);
      await user.save();
      return user;
    } catch (error) {
      throw e500(error);
    }
  };

  return controller;
};

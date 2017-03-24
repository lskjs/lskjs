import _ from 'lodash';
import Modules from '../v1.modules';

export default (ctx) => {
  const { User } = ctx.models;
  const modules = new Modules(ctx);
  const { e500 } = ctx.errors;
  const controller = {};
  controller.get = async (req) => {
    const criteria = modules.getCriteria(req);
    const user = await User.findOne(criteria);
    return user;
  };

  controller.edit = async (req) => {
    try {
      modules.isAuth(req);
      const userId = req.user._id;
      const params = req.allParams();
      const user = await User.findById(userId);
      Object.assign(user, _.pick(params, ['profile', 'meta']));
      user.profile = _.merge({}, user.profile, params.profile);
      user.meta = _.merge({}, user.meta || {}, params.meta || {});
      await user.save();
      return user;
    } catch (error) {
      throw e500(error);
    }
  };

  return controller;
};

import merge from 'lodash/merge';
import Modules from '../v1.modules';

export default (ctx) => {
  const { User } = ctx.models;
  const modules = new Modules(ctx);
  const { e500 } = ctx.errors;
  const resource = {

    get: async (req) => {
      const criteria = modules.getCriteria(req);
      const user = await User.findOne(criteria);
      return user;
    },

    edit: async (req) => {
      try {
        modules.isAuth(req);
        const userId = req.user._id;
        const params = req.allParams();
        let user = await User.findById(userId);
        user = merge(user, params);
        user.save();
        return user;
      } catch (error) {
        throw e500(error);
      }
    },

  };

  return resource;
};

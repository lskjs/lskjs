import _ from 'lodash';
import Modules from '../v1.modules';


const sample = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

function fullName(user) {
  let fullname;
  if (user.profile.middleName) {
    fullname = [user.profile.lastName, user.profile.firstName, user.profile.middleName];
  } else {
    fullname = [user.profile.firstName, user.profile.lastName];
  }
  return fullname.filter(a => a).join(' ') || sample.fullName;
}


export default (ctx) => {
  const { User } = ctx.models;
  const modules = new Modules(ctx);
  const { e404, e500 } = ctx.errors;
  const controller = {};

  controller.list = async (req) => {
    modules.isAuth(req);
    const users = await User.find({});
    return users;
  };

  controller.get = async (req) => {
    const criteria = modules.getCriteria(req);
    const user = await User.findOne(criteria);
    if (!user) throw e404('User not found!');
    return user;
  };

  controller.edit = async (req) => {
    // try {
    modules.isAuth(req);
    const userId = req.user._id;
    const params = req.allParams();
    const user = await User.findById(userId);
    if (!user) throw e404('User not found!');
    // ctx.log.info('params', params);
    // ctx.log.info('user', user);
    // _.merge(user, _.pick(params, ['username', 'password', 'profile']));
    if (params.username) user.username = params.username;
    if (params.password) user.password = params.password;
    user.profile = _.merge({}, user.profile, params.profile);
    console.log('user.profile', user.profile);
    user.name = fullName(user);

    return user.save();
    // } catch (error) {
    //   throw e500(error);
    // }
  };

  return controller;
};

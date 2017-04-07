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
  const { User, Passport } = ctx.models;
  const modules = new Modules(ctx);
  const { e404 } = ctx.errors;
  const { checkNotFound } = ctx.helpers;
  const controller = {};

  controller.list = async (req) => {
    modules.isAuth(req);
    const params = req.allParams();
    const { query } = params;
    let { limit = undefined, offset = 0 } = params;
    if (offset) offset = parseInt(offset, 10);
    if (limit) limit = parseInt(limit, 10);
    const users = await User
      .find(query)
      .limit(limit)
      .skip(offset);
    return users;
  };

  controller.length = async () => {
    const users = await User.find({});
    return { count: users.length };
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
    user.name = fullName(user);

    return user.save();
    // } catch (error) {
    //   throw e500(error);
    // }
  };

  controller.updateSocialData = async (req) => {
    const user = await User
    .findById(req.user._id)
    .then(checkNotFound);
    const passport = await Passport.findOne({
      user: user._id,
      provider: 'youtube',
    });
    await passport.updateSocialData();
    return passport.save();
  };
  controller.getSocialData = async (req) => {
    const user = await User
    .findById(req.user._id)
    .then(checkNotFound);
    const socialData = await user.getSocialData();
    if (socialData) return socialData;
    throw e404('!passport.meta');
  };

  return controller;
};

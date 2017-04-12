import _ from 'lodash';
export default (ctx) => {
  if (!ctx.passport) return null;
  const { e400, e403, e404 } = ctx.errors;
  const { User, Passport } = ctx.models;
  const { checkNotFound } = ctx.helpers;
  const controller = {};
  controller.socialSign = async (req) => {
    const passport = await Passport.getByToken(req.data.p);
    if (!passport) {
      return e404('!passport');
    }
    if (passport.user) {
      return e400('passport already have user');
    }
    const params = _.merge(
      { profile: passport.profile },
      req.data, // meta
      { username: await passport.generateUsername() },
    );
    // console.log({ params });
    const user = new User(params);
    await user.save();
    passport.user = user._id;
    await passport.save();
    user.passports.push(passport._id);
    await user.save();
    return {
      user,
      token: user.generateAuthToken(),
    };
  };

  controller.socialLogin = async (req) => {
    const passport = await Passport.getByToken(req.data.p);
    const user = await passport.getUser();
    if (!user) {
      return e404('User is not founded');
    }
    return {
      user,
      token: user.generateAuthToken(),
    };
  };

  controller.socialCallback = async (req, res) => {
    const params = req.allParams();
    try {
      return new Promise((resolve) => {
        return (ctx.passport.authenticate(params.provider, {}, async (err, data) => {
          if (err) {
            return resolve({ err });
          }
          if (data.passport) {
            const { passport, accessToken } = data;
            passport.token = accessToken;
            await passport.save();
            return resolve(res.redirect(`${ctx.config.url}/auth/passport?p=${passport.generateToken()}`));
          }
        }))(req);
      });
    } catch (err) {
      console.error(err, 'ERROR!');
    }
  };
  try {
    controller.vkAuth = ctx.passport.authenticate('vkontakte',
      { scope: ctx.config.auth.socials.vkontakte.scope },
    );
  } catch (err) {}

  controller.socialBind = async (req) => {
    const userId = req.user._id;
    const passport = await Passport
    .getByToken(req.data.p)
    .then(checkNotFound);
    const user = await User
    .findById(req.user._id)
    .then(checkNotFound);
    if (passport.user) throw e400('passport.user already exist');
    passport.user = userId;
    user.passports.push(passport._id);
    await passport.save();
    return user.save();
  };

  controller.getSocials = async (req) => {
    const userId = req.user._id;
    return Passport.find({
      user: userId,
    });
  };

  controller.socialUnbind = async (req) => {
    const params = req.allParams();
    const userId = req.user._id;
    const user = await User
    .findById(req.user._id)
    .then(checkNotFound);

    // OR passportId: passport._id
    const findParams = {};
    if (params.passportId) findParams._id = params.passportId;
    if (params.provider) findParams.provider = params.provider;
    findParams.user = userId;
    if (!findParams.passportId && !findParams.provider) {
      throw e400('!findParams.passportId && !findParams.provider');
    }
    const passport = await Passport
    .findOne(findParams)
    .then(checkNotFound);
    if (passport.user != userId) throw e403('Wrong user!');
    passport.user = null;
    user.passports = user.passports.filter((pId) => {
      return pId && pId.toString() !== params.p;
    });
    await passport.save();
    return user.save();
  };

  controller.approvedEmail = async (req) => {
    const params = req.allParams();
    const { t } = params;
    return User.findAndApproveEmail(t);
  };


  controller.youtubeAuth = ctx.passport.authenticate('youtube');
  return controller;
};

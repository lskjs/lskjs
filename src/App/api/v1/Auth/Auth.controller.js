import _ from 'lodash'
export default (ctx) => {
  const { e400, e404 } = ctx.errors;
  const { User, Passport } = ctx.models;
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
      req.data,
      { username: await passport.generateUsername() },
    );
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
        return (ctx.passport.authenticate(params.provider, {}, (err, data) => {
          if (err) {
            return resolve({ err });
          }
          if (data.passport) {
            const { passport } = data;
            return resolve(res.redirect(`${ctx.config.protocol}://${ctx.config.host}:${ctx.config.externalPort}/auth/passport?p=${passport.generateToken()}`));
          }
        }))(req);
      });
    } catch (err) {
      console.error(err, 'ERROR!');
    }
  };
  controller.vkAuth = ctx.passport.authenticate('vkontakte',
    { scope: ctx.config.auth.socials.vkontakte.scope },
  );

  controller.youtubeAuth = ctx.passport.authenticate('youtube');
  return controller;
};

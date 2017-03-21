import DefaultResource from 'lego-starter-kit/CoreApp/resourses/Auth';

export default (ctx) => {
  const { e400, e404 } = ctx.errors;
  const { Passport, User } = ctx.models;
  const { auth, protocol, host, externalPort } = ctx.config;
  const resources = {

    socialSignup: async (req) => {
      const passport = await Passport.getByToken(req.data.p);
      if (!passport) {
        throw e404('!passport');
      }
      if (passport.user) {
        throw e400('passport already have user');
      }
      const params = Object.assign({}, { profile: passport.profile }, req.data);
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
    },

    socialLogin: async (req) => {
      const passport = await Passport.getByToken(req.data.p);
      const user = await passport.getUser();
      if (!user) {
        throw e404('User is not founded');
      }
      return {
        user,
        token: user.generateAuthToken(),
      };
    },

    authVkontakte: ctx.passport.authenticate('vkontakte', {
      scope: auth.socials.vkontakte.scope,
    }),

    socialCallback: async (req, res) => {
      const params = req.allParams();
      try {
        return new Promise((resolve) => {
          return (ctx.passport.authenticate(params.provider, {}, (err, data) => {
            if (err) {
              return resolve({ err });
            }
            if (data.passport) {
              const { passport } = data;
              return resolve(res.redirect(`${protocol}://${host}:${externalPort}/auth/passport?p=${passport.generateToken()}`));
            }
          }))(req);
        });
      } catch (err) {
        console.error(err, 'ERROR!');
      }
    },

  }

  return Object.assign(DefaultResource(ctx), resources);
};

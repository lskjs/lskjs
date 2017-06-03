import validator from 'validator';
import _ from 'lodash';


export function canonize(str) {
  return str.toLowerCase().trim();
}

export default (ctx, module) => {
  const { checkNotFound } = ctx.helpers;
  const { e400, e403, e404 } = ctx.errors;
  const { Passport } = module.models;
  // console.log('User', Object.keys(User));
  // console.log(User);
  // console.log('User', Object.keys(User));
  const controller = {};

  controller.validate = async function (req) {
    const { User } = ctx.models;
    const user = await User.findById(req.user._id);
    if (!user) throw ctx.errors.e404('Не найден user в базе');
    return {
      __pack: 1,
      jwt: req.user,
      user,
      // token: user.getToken()
      // user,
    };
  };

  controller.silent = async function (req) {
    const { User } = ctx.models;
    const params = req.allParams();
    if (params.username) params.username = canonize(params.username);
    if (params.email) params.email = canonize(params.email);
    const username = `__s${Date.now()}__`;
    const user = new User(Object.assign({
      username,
      type: 'silent',
    }, params));
    await user.save();
    return {
      __pack: 1,
      signup: true,
      user,
      token: user.generateAuthToken(),
    };
  };
  controller.getUserFields = function (req) {
    const params = req.allParams();
    // console.log({ params });
    if (params.login) {
      if (!params.username) {
        params.username = params.login.split('@')[0];
      }
      if (!params.email && validator.isEmail(params.login)) {
        params.email = params.login;
      } // if email
    }
    if (params.username) params.username = canonize(params.username);
    if (params.email) params.email = canonize(params.email);
    // console.log({ params });
    return params;
  };
  controller.getUserCriteria = function (req) {
    const params = req.allParams();
    if (params.username) {
      return {
        username: canonize(params.username),
      };
    }
    if (params.email) {
      return {
        email: canonize(params.email),
      };
    }
    if (params.login) {
      return {
        $or: [
          {
            username: canonize(params.login),
          },
          {
            email: canonize(params.login),
          },
        ],
      };
    }
    throw ctx.errors.e400('Параметр username, email, login не передан');
  };
  controller.signup = async function (req) {
    const { User } = ctx.models;
    const userFields = controller.getUserFields(req);
    const criteria = controller.getUserCriteria(req);
    const existUser = await User.findOne(criteria);
    if (existUser) throw ctx.errors.e400('Пользователь с таким логином уже зарегистрирован');
    if (!userFields.meta) userFields.meta = {};
    userFields.meta.approvedEmail = false;
    // console.log({ userFields });
    const user = new User(userFields);
    await user.save();

    let emailSended;
    try {
      const link = await user.genereateEmailApprovedLink();
      await user.save();
      await ctx.modules.mailer.send({
        to: user.getEmail(),
        template: 'approveEmail',
        params: {
          user: user.toJSON(),
          link,
        },
      });
      emailSended = true;
    } catch (err) {
      ctx.log.warn(err);
      emailSended = false;
    }

    return {
      __pack: 1,
      signup: true,
      emailSended,
      user,
      token: user.generateAuthToken(),
    };
  };

  controller.login = async function (req) {
    const { User } = ctx.models;
    const params = req.allParams();

    if (!params.password) throw ctx.errors.e400('Пароль не заполнен');

    const criteria = controller.getUserCriteria(req);
    const user = await User.findOne(criteria);

    if (!user) throw ctx.errors.e404('Неверный логин');
    // if (!user) throw ctx.errors.e404('Такой пользователь не найден');

    if (!await user.verifyPassword(params.password)) {
      throw ctx.errors.e400('Неверный пароль');
      // throw ctx.errors.e400('Переданный пароль не подходит');
    }

    return {
      __pack: 1,
      user,
      token: user.generateAuthToken(),
    };
  };

  controller.updateToken = async function (req) {
    const { User } = ctx.models;
    const params = req.allParams();

    const userId = req.user && req.user._id;
    if (!userId) throw ctx.errors.e404('Токен не верный');

    const user = await User.findById(userId);

    if (!user) throw ctx.errors.e404('Такой пользователь не найден');

    return {
      __pack: 1,
      user,
      token: user.generateAuthToken(),
    };
  };

  controller.recovery = async function (req) {
    const { User } = ctx.models;
    if (!ctx.modules.mailer) throw 'Система не может отправить email';

    // const params = req.allParams();

    const criteria = controller.getUserCriteria(req);
    const user = await User.findOne(criteria);
    if (!user) throw ctx.errors.e404('Неверный логин');
    const email = user.getEmail();
    if (!email) throw ctx.errors.e400('У этого пользователя не был указан емейл для восстановления');

    const password = User.generatePassword();

    await ctx.modules.mailer.send({
      to: email,
      template: 'recovery',
      params: {
        user: user.toJSON(),
        password,
      },
    });

    user.password = password;
    await user.save();

    return {
      __pack: 1,
      emailSended: true,
    };
  };

  controller.emailApprove = async (req) => {
    const { User } = ctx.models;
    const params = req.allParams();
    const { t } = params;
    return User.findAndApproveEmail(t);
  };

  controller.socialSign = async (req) => {
    const { User } = ctx.models;
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
    // user.passports.push(passport._id);
    // await user.save();
    return {
      user,
      token: user.generateAuthToken(),
    };
  };

  controller.socialLogin = async (req) => {
    const passport = await Passport.getByToken(req.data.p);
    const user = await passport.getUser();
    if (!user) {
      return e404('User not found');
    }
    return {
      user,
      token: user.generateAuthToken(),
    };
  };

  controller.socialBind = async (req) => {
    const { User } = ctx.models;
    const userId = req.user._id;
    const passport = await Passport
      .getByToken(req.data.p)
      .then(checkNotFound);
    const user = await User
      .findById(req.user._id)
      .then(checkNotFound);
    if (passport.user) throw e400('passport.user already exist');
    passport.user = userId;
    // user.passports.push(passport._id);
    await passport.save();
    await user.save();
    return Passport.find({
      user: userId,
    });
  };

  controller.getSocials = async (req) => {
    const userId = req.user._id;
    return Passport.find({
      user: userId,
    });
  };

  controller.socialUnbind = async (req) => {
    const { User } = ctx.models;
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
    if (passport.user !== userId) throw e403('Wrong user!');
    passport.user = null;
    // user.passports = user.passports.filter((pId) => {
    //   return pId && pId.toString() !== params.p;
    // });
    await passport.save();
    await user.save();
    return Passport.find({
      user: userId,
    });
  };

  controller.approveEmail = async (req) => {
    const { User } = ctx.models;
    const params = req.allParams();
    const { t } = params;
    return User.findAndApproveEmail(t);
  };
  controller.approvedEmail = async (req) => {
    console.log('lsk-auth  approvedEmail => approveEmail');
    this.approveEmail(req);
  };


  controller.socialCallback2 = async (req, res, next) => {
    const { provider } = req.params;
    module.passport.authenticate(provider, (err, { redirect }) => {
      if (err) { return next(err); }
      res.redirect(redirect || '/');
    })(req, res, next);
  };

  controller.socialCallback = async (req, res) => {
    const { provider } = req.params;
    console.log('socialCallback');
    try {
      return new Promise((resolve, reject) => {
        (
          module.passport.authenticate(
            provider,
            module.strategies[provider].getPassportParams(),
            async (err, data) => {
              console.log('socialCallback CALLBACK CALLBACK CALLBACK CALLBACK', err, data);
              if (err) return reject(err);
              return resolve(res.redirect(data.redirect || '/'));
            })
        )(req);
      });
    } catch (err) {
      console.error(err, 'ERROR!');
      throw err;
    }
  };

  controller.socialAuth = (req, res, next) => {
    const { provider } = req.params;
    console.log('socialAuth');
    // console.log('socialAuth', provider);
    if (!module._strategies[provider] || !module.strategies[provider]) return e404('not such provider');
    module.passport.authenticate(
      provider,
      module.strategies[provider].getPassportParams(),
    )(req, res, next);
  };

  return controller;
};

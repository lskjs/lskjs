import _ from 'lodash';
import validator from 'validator';
import __passport from 'passport';
import getModels from './models';
import getStrategies from './strategies';
import Router from './router';

export function canonize(str) {
  return str.toLowerCase().trim();
}

export default (ctx) => {
  return class AuthModule {

    async init() {
      this.models = getModels(ctx);
      this.strategies = getStrategies(ctx);
      this.passport = __passport;
      this.router = Router;
      const { strategies } = this || {};
      if (ctx.config.auth && ctx.config.auth.socials) {
        this.strategies = {};
        _.map(strategies, (Strategy, name) => {
          if (!ctx.config.auth.socials[name]) return null;
          return new Strategy();
        }).filter(s => s).map((strategy) => {
          this.strategies[strategy.providerName] = strategy;
        });
      }
    }
    async run() {
      if (this.strategies) {
        _.forEach(this.strategies || [], (strategy) => {
          this.passport.use(strategy.getStrategy(strategy));
        });
      }
      ctx.app.use('/api/module/auth', this.getApi());
    }

    getController() {
      const { checkNotFound } = ctx.helpers;
      const { e400, e404 } = ctx.errors;
      const { Passport } = this.models;
      const { User } = ctx.models;
      const controller = {};

      controller.validate = async function (req) {
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
        const userFields = controller.getUserFields(req);
        const criteria = controller.getUserCriteria(req);
        const existUser = await User.findOne(criteria);
        if (existUser) throw ctx.errors.e400('Username with this email or username is registered');
        if (!userFields.meta) userFields.meta = {};
        userFields.meta.approvedEmail = false;
        // console.log({ userFields });
        const user = new User(userFields);
        await user.save();

        let sended;
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
          sended = true;
        } catch (err) {
          ctx.log.warn(err);
          sended = false;
        }

        return {
          __pack: 1,
          signup: true,
          emailSended: sended,
          user,
          token: user.generateAuthToken(),
        };
      };

      controller.login = async function (req) {
        const params = req.allParams();

        if (!params.password) throw ctx.errors.e400('Параметр password не передан');

        const criteria = controller.getUserCriteria(req);
        const user = await User.findOne(criteria);

        if (!user) throw ctx.errors.e404('Такой пользователь не найден');

        if (!await user.verifyPassword(params.password)) {
          throw ctx.errors.e400('Переданный пароль не подходит');
        }

        return {
          __pack: 1,
          user,
          token: user.generateAuthToken(),
        };
      };
      controller.recovery = async function (req) {
        // const params = req.allParams();

        const criteria = controller.getUserCriteria(req);

        const user = await User.findOne(criteria);
        if (!user) throw ctx.errors.e404('Такой пользователь не найден');

        const password = User.generatePassword();
        user.password = password;
        await user.save();
        // console.log('user', user);
        const emailOptions = {
          subject: 'Восстановление пароля на сайте',
          text: `Ваш пароль: ${password}`,
        };

        let sended;
        try {
          await user.sendEmail(emailOptions);
          sended = true;
        } catch (err) {
          ctx.log.warn(err);
          sended = false;
        }

        return {
          __pack: 1,
          emailSended: sended,
        };
      };

      controller.emailApprove = async (req) => {
        const params = req.allParams();
        const { t } = params;
        return User.findAndApproveEmail(t);
      };

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
            return (ctx.modules.auth.passport.authenticate(params.provider, {}, async (err, data) => {
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
        await user.save();
        return Passport.find({
          user: userId,
        });
      };

      controller.approvedEmail = async (req) => {
        const params = req.allParams();
        const { t } = params;
        return User.findAndApproveEmail(t);
      };


      controller.youtubeAuth = this.passport.authenticate('youtube');
      // console.log(ctx.config.auth.socials.vkontakte);
      try {
        controller.vkAuth = this.passport.authenticate('vkontakte',
          { scope: ctx.config.auth.socials.vkontakte.scope || [] },
        );
      } catch (err) {}

      return controller;
    }

    getApi() {
      const api = ctx.asyncRouter();
      const { isAuth } = ctx.middlewares;
      const { createResourse, wrapResourse } = ctx.helpers;
      const { Passport } = this.models;
      const { User } = ctx.models;
      const controller = this.getController();
      api.all('/login', controller.login);
      api.post('/signup', controller.signup);
      api.all('/recovery', isAuth, controller.ecovery);
      api.all('/email/approve', controller.emailApprove);
      if (!controller) return api;
      // Регистрация пользователя через соц сеть
      api.all('/social', isAuth, controller.getSocials);
      api.all('/social/signup', controller.socialSign);
      api.all('/social/login', controller.socialLogin);
      // Добавление соц.сетей к пользователю
      api.all('/social/bind', isAuth, controller.socialBind);
      api.all('/social/unbind', isAuth, controller.socialUnbind);
      // social auth init
      api.get('/youtube', controller.youtubeAuth);
      if (controller.vkAuth) {
        api.get('/vkontakte', controller.vkAuth);
      }

      // social auth callback
      api.get('/:provider/callback', controller.socialCallback);

      return api;
    }
  };
};

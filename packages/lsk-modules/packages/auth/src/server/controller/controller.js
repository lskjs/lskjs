// import validator from 'validator';
import merge from 'lodash/merge';
import random from 'lodash/random';
import m from 'moment';
import set from 'lodash/set';
import unset from 'lodash/unset';
import validator from 'validator';
// import canonize from '../canonize';
// import canonizeUsername from '../canonizeUsername';
// import transliterate from '../transliterate';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default (ctx, module) => {
  const { checkNotFound } = ctx.helpers;
  const { e400, e403, e404 } = ctx.errors;
  const { Passport } = module.models;

  const controller = {};

  controller.validate = async function (req) {
    const { User } = ctx.models;
    const user = await User.findById(req.user._id);
    if (!user) throw ctx.errors.e404('Не найден user в базе');
    return {
      __pack: 1,
      jwt: req.user,
      user: await User.prepare(user, { req }),
      // token: user.getToken()
      // user,
    };
  };

  controller.silent = async function (req) {
    const { User } = ctx.models;
    const params = req.allParams();
    if (params.username) params.username = module.canonize(params.username);
    if (params.email) params.email = module.canonize(params.email);
    const username = `__s${Date.now()}__`;
    const user = new User(Object.assign({
      username,
      type: 'silent',
    }, params));
    await user.save();
    req.user = user;
    return {
      __pack: 1,
      signup: true,
      user: await User.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  };
  // get for create
  controller.getUserFields = function (req) {
    const params = req.allParams();
    // console.log({ params });
    if (params.login) {
      if (!params.username) {
        params.username = params.login;
      }
      if (!params.email && validateEmail(params.login)) {
        params.email = params.login;
      } // if email
    }
    if (params.username) params.username = module.canonizeUsername(params.username);
    if (params.email) params.email = module.canonize(params.email);
    // console.log({ params });
    return params;
  };
  controller.getUserCriteria = function (req) {
    const params = req.allParams();
    if (params.username) {
      return {
        username: module.canonize(params.username),
      };
    }
    if (params.email) {
      return {
        email: module.canonize(params.email),
      };
    }
    if (params.login) {
      return {
        $or: [
          {
            username: module.canonize(params.login),
          },
          {
            email: module.canonize(params.login),
          },
        ],
      };
    }
    throw ctx.errors.e400('Параметр username, email, login не передан');
  };
  controller.afterSignup = async function ({ req, user }) {
    const { User } = ctx.models;
    const { mailer } = ctx.modules;
    let emailSended = null;
    if (mailer) {
      try {
        const link = await user.genereateEmailApprovedLink();
        await mailer.send({
          ...user.getMailerParams('primary'),
          template: 'approveEmail',
          // locale: user.locale || req.locale,
          // to: user.getEmail('primary'),
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
    }

    return {
      __pack: 1,
      signup: true,
      emailSended,
      user: await User.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  };
  controller.signup = async function (req) {
    const { User } = ctx.models;
    const { password, ...userFields } = controller.getUserFields(req);
    const criteria = controller.getUserCriteria(req);
    const existUser = await User.findOne(criteria);
    if (existUser) throw ctx.errors.e400('Пользователь с таким логином уже зарегистрирован');
    if (!userFields.meta) userFields.meta = {};
    userFields.meta.approvedEmail = false;
    const user = new User(userFields);
    if (password) {
      await user.setPassword(password);
    }
    await user.save();
    req.user = user;

    return controller.afterSignup({ req, user });
  };

  controller.login = async function (req) {
    const { User } = ctx.models;
    const params = req.allParams();

    if (!params.password) throw ctx.errors.e400('Пароль не заполнен');

    const criteria = controller.getUserCriteria(req);
    const user = await User.findOne(criteria);

    if (!user) throw ctx.errors.e404('Неверный логин');
    if (!await user.verifyPassword(params.password)) {
      throw ctx.errors.e400('Неверный пароль');
    }
    req.user = user;

    return {
      __pack: 1,
      user: await User.prepare(user, { req, withAppState: true }),
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
    req.user = user;

    return {
      __pack: 1,
      user: await User.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  };

  controller.recovery = async function (req) {
    const { User } = ctx.models;
    const { mailer } = ctx.modules;
    if (!mailer) throw 'Система не может отправить email';

    // const params = req.allParams();

    const criteria = controller.getUserCriteria(req);
    const user = await User.findOne(criteria);
    if (!user) throw ctx.errors.e404('Неверный логин');
    const email = user.getEmail();
    if (!email) throw ctx.errors.e400('У этого пользователя не был указан емейл для восстановления');

    const password = User.generatePassword();

    await mailer.send({
      ...user.getMailerParams('primary'),
      template: 'recovery',
      // locale: user.locale || req.locale,
      // to: user.getEmail(),
      params: {
        user: user.toJSON(),
        password,
      },
    });

    await user.setPassword(password);
    await user.save();

    return {
      __pack: 1,
      emailSended: true,
    };
  };

  controller.socialLogin = async (req) => {
    const { User } = ctx.models;
    const passport = await Passport.getByToken(req.data.p);
    let user = await passport.getUser();
    if (!user) {
      const params = merge(
        { profile: passport.profile },
        // req.data, // meta
        {
          username: await passport.generateUsername(User),
          // _id,
        },
      );
      // console.log({ params });
      user = new User(params);
      // await user.save();
      user.updateFromPassport(passport, { req });
      await user.save();
      passport.userId = user._id;
      // console.log('passport.save before', passport);
      await passport.save();
    }
    req.user = user;

    return {
      user: await User.prepare(user, { req, withAppState: true }),
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
    if (passport.userId) throw e400('passport.userId already exist');
    passport.userId = userId;
    // user.passports.push(passport._id);
    await passport.save();
    await user.updateFromPassport(passport);
    await user.save();
    return Passport.find({
      userId,
    });
  };

  controller.getSocials = async (req) => {
    const userId = req.user._id;
    return Passport.find({
      userId,
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
    findParams.userId = userId;
    if (!findParams.passportId && !findParams.provider) {
      throw e400('!findParams.passportId && !findParams.provider');
    }
    const passport = await Passport
      .findOne(findParams)
      .then(checkNotFound);
    if (passport.userId !== userId) throw e403('Wrong user!');
    passport.userId = null;
    // user.passports = user.passports.filter((pId) => {
    //   return pId && pId.toString() !== params.p;
    // });
    await passport.save();
    await user.save();
    return Passport.find({
      userId,
    });
  };


  controller.tokenLogin = async function (req) {
    const { User } = ctx.models;
    const token = req.data.t || req.data.token;
    if (!token) throw ctx.errors.e400('!token');

    const user = await User.tokenLogin({ token });
    if (!user) throw ctx.errors.e404('!user');
    req.user = user;

    return {
      __pack: 1,
      user: await User.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  };

  controller.approveEmail = async (req) => {
    const { User } = ctx.models;
    return User.findAndApproveEmail(req.data.t);
  };
  controller.approvedEmail = async (req) => {
    console.log('DEPRECATED lsk-auth  approvedEmail => approveEmail');
    return this.approveEmail(req);
  };
  controller.emailApprove = async (req) => {
    console.log('DEPRECATED lsk-auth  emailApprove => approveEmail');
    return this.approveEmail(req);
  };


  controller.socialCallback2 = async (req, res, next) => {
    const { provider } = req.params;
    __DEV__ && console.log('socialCallback2');
    module.passportService.authenticate(provider, (err, { redirect }) => {
      if (err) { return next(err); }
      res.redirect(redirect || '/');
    })(req, res, next);
  };

  controller.socialAuth = (req, res, next) => {
    const { provider } = req.params;
    if (!module.strategies[provider]) return e404(`No provider: ${provider}`);
    module.passportService.authenticate(
      provider,
      module.strategies[provider].getPassportAuthenticateParams(),
    )(req, res, next);
  };

  controller.socialCallback = async (req, res) => {
    // throw '!socialCallback';
    const { provider } = req.params;
    // __DEV__ && console.log('socialCallback');
    // console.log(123123123);

    try {
      return new Promise((resolve, reject) => {
        (
          module.passportService.authenticate(
            provider,
            module.strategies[provider].getPassportAuthenticateParams(),
            async (err, data) => {
              // console.log('socialCallback CALLBACK CALLBACK CALLBACK CALLBACK', err, data);
              if (err) return reject(err);
              return resolve(res.redirect(data.redirect || '/'));
            },
          )
        )(req);
      });
    } catch (err) {
      // console.error(err, 'ERROR!');
      throw err;
    }
  };


  controller.phoneCode = async (req) => {
    if (!module.config.sms) throw '!module.config.sms';
    const smsConfig = module.config.sms;

    const { phone } = req.data;
    const code = random(100000, 999999);
    controller.lastCode = code;

    const smsText = `Ваш проверочный код: ${code}`;
    if (module.tbot) {
      module.tbot.notify(`Номер: ${phone}\n${smsText}`);
    }
    const text = module.transliterate(smsText);

    let res;
    // console.log('smsConfig.provider', smsConfig.provider);
    if (smsConfig.provider === 'bytehand') {
      const qs = {
        ...smsConfig.params,
        to: phone,
        text,
      };
      res = await ctx.api.fetch('http://bytehand.com:3800/send', { qs });
    } else if (smsConfig.provider === 'nexmo') {
      const body = {
        ...smsConfig.params,
        to: phone,
        text,
      };
      // console.log('https://rest.nexmo.com/sms/json', { body });
      res = await ctx.api.fetch('https://rest.nexmo.com/sms/json', {
        method: 'POST',
        // headers: {
        //   'Content-Type': '!',
        // },
        body,
      });
      // console.log(res.messages[0].status !== 0, res.messages[0].status, JSON.stringify(res, null, 2));
      if (res.messages[0].status !== '0') {
        throw res.messages[0]['error-text'];
        // throw res.messages[0].errorText;
      }
    } else {
      throw '!provider';
    }
    const pack = {
      phone,
      res,
    };
    if (__DEV__) {
      pack.code = code;
    }
    // console.log('result', JSON.stringify(pack, null, 2));
    return pack;
  };

  controller.phoneApprove = (req, res, next) => {
    if (!module.config.sms) throw '!module.config.sms';
    const { phone, code } = req.data;
    return { phone, code };
  };

  controller.phoneLogin = async (req, res, next) => {
    if (!module.config.sms) throw '!module.config.sms';
    const { phone, code } = req.data;
    const { User } = ctx.models;
    if (!((module.config.sms.defaultCode && code === module.config.sms.code) || code === controller.lastCode)) {
      throw 'Код не верный';
    }

    let user = await User.findOne({ username: phone });
    if (!user) {
      user = await User.create({
        username: phone,
        profile: {
          contacts: {
            phone,
          },
        },
      });
    }
    req.user = user;

    return {
      __pack: 1,
      user: await User.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  };

  controller.getPassportByToken = async (req, res) => Passport.getByToken(req.data.p);
  controller.getPermit = async (req) => {
    const { _id } = req.data;
    if (!_id) throw '!_id';
    const { PermitModel: Permit } = ctx.modules.permit.models;
    const permit = await Permit.findOne({
      _id,
    });
    if (!permit) throw '!permit';
    if (permit.type === 'user.restorePassword') return Permit.prepare(permit, { req });
    if (!req.user || !req.user._id) throw '!userId';
    if (!permit) throw 'not found';
    if (ctx.hasGrant(req.user, 'superadmin') || String(permit.userId) === req.user._id) {
      return Permit.prepare(permit, { req });
    }
    throw '!permission';
  };
  controller.emailPermit = async (req) => {
    const { User } = ctx.models;
    const { ObjectId } = ctx.db.Types;
    if (!req.user || !req.user._id) throw '!_id';
    let userId = req.user._id;
    if (req.data._id && req.data._id !== userId) {
      if (ctx.hasGrant(req.user, 'admin')) {
        userId = req.data._id;
      } else {
        throw '!permission';
      }
    }
    const user = await User
      .findById(userId);
    if (!user) throw '!user';
    const { PermitModel: Permit } = ctx.modules.permit.models;
    const { email } = req.data;
    if (!email || !validator.isEmail(email)) {
      throw 'emailNotValid';
    }
    let type;
    if (user.email) {
      type = 'change';
    } else {
      type = 'set';
    }
    if (user.email && email === user.email) {
      throw 'emailNotChanged';
    }
    const date = new Date();
    const isTimeout = await Permit.countDocuments({
      activatedAt: {
        $exists: false,
      },
      expiredAt: {
        $gte: date,
      },
      'info.email': email,
      'info.userId': ObjectId(user._id),
      type: {
        $in: [
          'user.setEmail',
          'user.changeEmail',
        ],
      },
      createdAt: {
        $gte: m(date).add(-User.changeEmailTimeout.value, User.changeEmailTimeout.type).toDate(),
      },
    });
    if (isTimeout) {
      throw 'timeout';
    }
    const emailExist = await User
      .countDocuments({
        _id: {
          $ne: userId,
        },
        email,
      });
    if (emailExist) {
      throw 'emailExist';
    }
    let str;
    if (type === 'change') {
      str = `${user._id}_${email}_${user.email}_${date.getTime()}`;
    } else if (type === 'set') {
      str = `${user._id}_${email}_${date.getTime()}`;
    }
    const code = await Permit.generateUniqCode({
      codeParams: { str, type: 'hash' },
      criteria: {
        type: `user.${type}Email`,
        activatedAt: {
          $exists: false,
        },
        expiredAt: {
          $gte: date,
        },
      },
    });
    const permit = await Permit.createPermit({
      expiredAt: Permit.makeExpiredAt(User.changeEmailLiveTime),
      type: `user.${type}Email`,
      userId: user._id,
      info: {
        email,
        oldEmail: user.email,
        userId: user._id,
        type,
      },
      code,
    });
    set(user, 'private.info.email', email);
    set(user, 'private.info.emailPermitId', permit._id);
    user.markModified('private.info');
    await user.save();
    const eventType = `events.user.${type}Email${ctx.hasGrant(user, 'newUser') ? 'Old' : ''}`;
    ctx.emit(eventType, {
      type: eventType,
      targetUser: user,
      user,
      permit,
      email,
      link: ctx.url(`/auth/confirm/email?code=${permit.code}`),
    });
    console.log(ctx.url(`/auth/confirm/email?code=${permit.code}`), eventType);
    return Permit.prepare(permit, { req });
  };
  controller.confirmEmail = async (req) => {
    const { User } = ctx.models;
    const { PermitModel: Permit } = ctx.modules.permit.models;
    const { code } = req.data;
    if (!code) throw '!code';
    const permit = await Permit.findOne({
      $or: [
        {
          type: 'user.changeEmail',
        },
        {
          type: 'user.setEmail',
        },
      ],
      code,
    });
    if (!permit) throw 'invalidCode';
    if (permit.activatedAt) throw 'activated';
    const date = new Date();
    if (date > permit.expiredAt) throw 'expired';
    const user = await User
      .findById(permit.info.userId);
    if (!user) throw '!user';
    const emailExist = await User
      .findOne({
        _id: {
          $ne: user._id,
        },
        email: permit.info.email,
      })
      .select([
        'email',
      ]);
    if (emailExist) {
      throw 'emailExist';
    }
    if (user.email && permit.info.oldEmail && user.email !== permit.info.oldEmail) {
      throw 'emailWasChanged';
    }
    await permit.activate();
    user.email = permit.info.email;
    unset(user, 'private.info.emailPermitId');
    unset(user, 'private.info.email');
    user.markModified('private.info');
    set(user, 'private.lastUpdates.email', date);
    user.markModified('private.lastUpdates.email');
    if (!user.meta.approvedEmail) {
      user.meta.approvedEmail = true;
      user.markModified('meta.approvedEmail');
    }
    await user.save();
    const permits = await Permit.find({
      _id: { $ne: permit._id },
      type: permit.type,
      userId: user._id,
    });
    await Promise.map(permits, (p) => {
      p.disabledAt = date;
      return p.save();
    });
    return permit;
  };
  controller.restorePasswordPermit = async (req) => {
    const { User } = ctx.models;
    const { email } = req.data;
    if (!email || !validator.isEmail(email)) {
      throw 'emailNotValid';
    }
    const user = await User
      .findOne({ email })
      .select([
        'email',
      ]);
    if (!user) {
      throw 'notFound';
    }
    const { PermitModel: Permit } = ctx.modules.permit.models;
    const date = new Date();
    const str = `${user._id}_${email}_${date.getTime()}`;
    const code = await Permit.generateUniqCode({
      codeParams: { str, type: 'hash' },
      criteria: {
        type: 'user.restorePassword',
        activatedAt: {
          $exists: false,
        },
        expiredAt: {
          $gte: date,
        },
      },
    });
    const permit = await Permit.createPermit({
      expiredAt: Permit.makeExpiredAt(User.restorePasswordLiveTime),
      type: 'user.restorePassword',
      userId: user._id,
      info: {
        userId: user._id,
        email,
      },
      code,
    });
    ctx.emit('events.user.restorePassword', {
      type: 'events.user.restorePassword',
      targetUser: user,
      user,
      permit,
      email,
      link: ctx.url(`/auth/permit/${permit._id}?code=${permit.code}`),
    });
    console.log(ctx.url(`/auth/permit/${permit._id}?code=${permit.code}`), 'events.user.restorePassword');
    return Permit.prepare(permit, { req });
  };
  controller.confirmPassword = async (req) => {
    const { User } = ctx.models;
    const { PermitModel: Permit } = ctx.modules.permit.models;
    const { code, password } = req.data;
    if (!code) throw '!code';
    const permit = await Permit.findOne({
      type: 'user.restorePassword',
      code,
    });
    if (!permit) throw { code: 'invalidCode' };
    if (permit.activatedAt) throw { code: 'activated' };
    const date = new Date();
    if (date > permit.expiredAt) throw { code: 'expired' };
    const user = await User
      .findById(permit.userId);
    if (!user) throw '!user';
    await permit.activate();
    await user.setPassword(password);
    set(user, 'private.lastUpdates.password', date);
    user.markModified('private.lastUpdates.password');
    await user.save();
    return Promise.props({
      user: User.prepare(user, { req }),
      token: user.generateAuthToken(),
      permit: Permit.prepare(permit, { req }),
    });
  };
  controller.findOneByCode = async (req) => {
    const { code } = req.data;
    if (!code) throw '!code';
    const { PermitModel: Permit } = ctx.modules.permit.models;
    const permit = await Permit.findOne({
      code,
    });
    if (!permit) throw '!permit';
    if (permit.type === 'user.restorePassword') return Permit.prepare(permit, { req });
    if (!req.user || !req.user._id) throw '!userId';
    if (!permit) throw 'not found';
    if (ctx.hasGrant(req.user, 'superadmin') || String(permit.userId) === req.user._id) {
      return Permit.prepare(permit, { req });
    }
    throw '!permission';
  };

  return controller;
};

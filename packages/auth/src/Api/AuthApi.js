import Bluebird from 'bluebird';
import merge from 'lodash/merge';
import random from 'lodash/random';
import set from 'lodash/set';
import map from 'lodash/map';
import omit from 'lodash/omit';
import unset from 'lodash/unset';
import get from 'lodash/get';
import BaseApi from '@lskjs/server-api';
import transliterate from '@lskjs/utils/transliterate';
import canonizeParams from '@lskjs/utils/canonizeParams';
// import canonizePhone from '@lskjs/utils/canonizePhone';
// import validatePhone from '@lskjs/utils/validatePhone';
import validateEmail from '@lskjs/utils/validateEmail';
import getReqOrigin from '@lskjs/utils/getReqOrigin';

export default class AuthApi extends BaseApi {
  async init() {
    await super.init();
    // TODO: ввести в лск асинхронную загрузку Api
    const auth = await this.app.module('auth');
    this.helpers = auth.helpers;
  }
  getRoutes() {
    // const { isAuth } = this.app.middlewares;
    return {
      ...(super.getRoutes()),
      '/login': ::this.login,
      '/signup': ::this.signup, // POST
      '/updateToken': ::this.updateToken,

      '/permit': ::this.getPermit,
      // '/confirm': ::this.confirmPermit,
      '/permit/confirm': ::this.confirmPermit,
      // // '/loginToken': ::this.loginToken,

      '/restorePassword': ::this.restorePassword,
      // '/setPassword': ::this.setPassword, => confirm

      // '/email/confirm': ::this.confirmEmail, // (req, res) => res.redirect('/cabinet'));

      // '/phone/code': ::this.phoneCode,
      // '/phone/approve': ::this.phoneApprove, => confirm
      // '/phone/login': ::this.phoneLogin,
      //
      '/status': ::this.status,
      '/session': ::this.session,
      '/check': ::this.check,

      // Регистрация пользователя через соц сеть
      // '/social': ::this.getSocials, // isAuth,
      // '/social/signup': ::this.socialLogin,
      // '/social/login': ::this.socialLogin,
      // '/social/bind': ::this.socialBind, // Добавление соц.сетей к пользователю // isAuth,
      // '/social/unbind': ::this.socialUnbind, // isAuth,

      // '/passport/getByToken': ::this.getPassportByToken,
      // '/passports/detach': ::this.passportsDetach,
      // '/restorePasswordPermit': ::this.restorePasswordPermit,

      '/info': ::this.info,
      // social auth init
      '/:provider': ::this.socialAuth,
      '/:provider/auth': ::this.socialAuth,
      '/:provider/callback': ::this.socialCallback,
    };
  }

  // getRoutes() {
  //   return {
  //     '/login': ::this.login,
  //     '/accountkit': ::this.accountkit,
  //     '/facebook': ::this.facebook,
  //     '/social': ::this.social,
  //     // '/vkontakte': ::this.vkontakte,
  //     '/phone': ::this.phoneOrEmail,
  //     '/email': ::this.phoneOrEmail,
  //     '/confirm': ::this.confirm,
  //     '/status': ::this.status,
  //     '/check': ::this.check,
  //   };
  // }

  // async login() {
  //   return { asd: 12 };
  // }

  async updateToken(req) {
    const { UserModel } = this.app.models;
    const userId = req.user && req.user._id;
    if (!userId) throw req.e('auth.tokenIncorrect', { status: 404 });

    const user = await UserModel.findById(userId);
    if (!user) throw req.e('auth.userNotFound', { status: 404 });
    req.user = user;

    const token = this.helpers.generateAuthToken(user);
    return {
      __pack: 1,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token,
    };
  }

  async status(req) {
    return {};
  }

  async session(req) {
    const authModule = await this.app.module('auth');
    return authModule.getAuthSession(req);
  }

  async check(req) {
    const criteria = canonizeParams(req.data);
    if (!Object.keys(criteria)) throw this.e('auth.loginRequired', { status: 400 });
    const { UserModel } = this.app.models;
    const user = await UserModel.findOne(criteria).select('_id');
    return {
      exists: !!user,
    };
  }
  //

  loginCreds = ['username', 'email', 'phone', 'login'];
  getUserCriteria(rawParams) {
    const { loginCreds = [] } = this;
    const params = canonizeParams(rawParams);
    // eslint-disable-next-line no-restricted-syntax
    for (const cred of loginCreds) {
      if (loginCreds.includes(cred) && params[cred]) {
        return { [cred]: params[cred] };
      }
    }
    throw { code: 'auth.loginEmpty', status: 400 };
  }

  async login(req) {
    const { UserModel } = this.app.models;
    const { password } = req.data;
    if (!password) throw req.e('auth.passwordEmpty', { status: 400 });
    const user = await UserModel.findOne(this.getUserCriteria(req.data));
    if (!user) throw req.e('auth.loginIncorrect', { status: 400 });
    if (get(user, 'statuses.blockedAt')) {
      throw req.e('auth.blocked', { status: 403 });
    }
    if (!(await this.helpers.verifyPassword(password, user.password))) {
      throw req.e('auth.passwordIncorrect', { status: 400 });
    }
    req.user = user;
    const token = this.helpers.generateAuthToken(user);
    // await this.helpers.updateLoginAt(user);
    return {
      __pack: 1,
      _id: user._id,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token,
    };
  }

  async signup(req) {
    const permitModule = await this.app.module('permit');
    if (!permitModule) throw '!permitModule';
    const { UserModel, PermitModel } = this.app.models;
    const { password, ...userFields } = req.data;
    const loginParams = canonizeParams(req.data);
    const criteria = this.getUserCriteria(loginParams);
    const existUser = await UserModel.findOne(criteria).select('_id');
    const loginField = Object.keys(criteria)[0];
    if (existUser) throw req.e(`auth.${loginField}Exists`, { status: 400 });
    const user = new UserModel({
      ...userFields, // TODO: validation
      ...loginParams,
    });
    if (password) {
      await this.helpers.setPassword(user, password);
    }
    await user.save();
    req.user = user;

    if (loginField === 'email') {
      const { email } = loginParams;
      const code = await permitModule.genCode('emailVerify');
      const permit = await PermitModel.createPermit({
        expiredAt: permitModule.createExpiredAt('emailVerify'),
        type: 'auth.confirmEmail',
        userId: user._id,
        info: {
          provider: 'email',
          email,
          userId: user._id,
        },
        code,
      });
      this.app.emit('events.auth.signup', {
        type: 'events.auth.signup',
        userId: user._id,
        user,
        permit,
        email: permit.info.email,
        link: this.app.url(`/auth/permit?permitId=${permit._id}&code=${permit.code}`),
      });
    }
    // const link = (await this.helpers.genereateEmailApprovedLink) ? this.helpers.genereateEmailApprovedLink(user) : null;
    // this.app.emit('events.auth.signup', { user, link });
    const token = this.helpers.generateAuthToken(user);
    return {
      __pack: 1,
      signup: true,
      _id: user._id,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token,
    };
  }

  async permitAction({ req, permit }) {
    const { UserModel, PermitModel } = this.app.models;
    if (permit.type === 'auth.confirmEmail') {
      const user = await UserModel.findById(permit.userId).sort({ createdAt: 1 });
      if (!user) throw '!user';
      await permit.activate();
      user.setStatus('confirmEmailAt', new Date());
      await user.save();
      const token = this.helpers.generateAuthToken(user);
      return Bluebird.props({
        __pack: true,
        user: UserModel.prepare(user, { req }),
        token,
        data: {
          permit: PermitModel.prepare(permit, { req }),
        },
      });
    }
    if (permit.type === 'auth.restorePassword') {
      const { password } = req.data;
      const user = await UserModel.findById(permit.userId);
      if (!user) throw '!user';
      await permit.activate();
      await this.helpers.setPassword(user, password);
      user.setStatus('passwordAt', new Date());
      await user.save();
      const token = this.helpers.generateAuthToken(user);
      return Bluebird.props({
        __pack: true,
        user: UserModel.prepare(user, { req }),
        token,
        data: {
          permit: PermitModel.prepare(permit, { req }),
        },
      });
    }
    throw 'permit.incorrectType';
  }

  async confirmPermit(req) {
    const { code, permitId } = req.data;
    const { PermitModel } = this.app.models;
    if (!code) throw '!code';
    if (!permitId) throw req.e('permit.permitIdEmpty', { status: 400 });
    // const permit = await PermitModel.findById(permitId);
    // if (!permit) throw this.e(404, 'Permit not found!');
    const permit = await PermitModel.findById(permitId);
    if (!permit) throw req.e('permit.permitNotFound', { status: 404 });
    const status = permit.getStatus();

    if (status !== 'valid') {
      throw req.e('permit.statusInvalid', { status: 400, data: { status } });
    }
    if (!this.equal(code, permit.code)) throw this.app.e('permit.codeInvalid', { status: 400 });

    return this.permitAction({ req, permit });
  }

  async restorePassword(req) {
    const permitModule = await this.app.module('permit');
    const { UserModel, PermitModel } = this.app.models;
    const { email } = req.data;

    if (!email || !validateEmail(email)) {
      throw 'emailNotValid';
    }
    const user = await UserModel.findOne({ email }).select(['email']);
    if (!user) {
      throw 'notFound';
    }
    const code = await permitModule.genCode('emailVerifyStrong');
    const permit = await PermitModel.createPermit({
      expiredAt: permitModule.createExpiredAt('emailVerifyStrong'),
      type: 'auth.restorePassword',
      userId: user._id,
      info: {
        userId: user._id,
        email,
      },
      code,
    });
    this.app.emit('events.auth.restorePassword', {
      type: 'events.auth.restorePassword',
      userId: user._id,
      user,
      permit,
      email,
      link: this.app.url(`/auth/permit?permitId=${permit._id}&code=${permit.code}`),
    });
    return PermitModel.prepare(permit, { req });
  }

  // async setPassword(req) {
  //   const { UserModel, PermitModel } = this.app.models;
  //   const { code, password } = req.data;
  //   if (!code) throw '!code';
  //   const permit = await PermitModel.findOne({
  //     type: 'user.restorePassword',
  //     code,
  //   });
  //   if (!permit) throw { code: 'invalidCode' };
  //   if (permit.activatedAt) throw { code: 'activated' };
  //   const date = new Date();
  //   if (date > permit.expiredAt) throw { code: 'expired' };
  //   const user = await UserModel.findById(permit.userId);
  //   if (!user) throw '!user';
  //   await permit.activate();
  //   await this.helpers.setPassword(user, password);
  //   set(user, 'private.lastUpdates.password', date);
  //   user.markModified('private.lastUpdates.password');
  //   await user.save();
  //   const token = this.helpers.generateAuthToken(user);
  //   return Bluebird.props({
  //     __pack: true,
  //     user: UserModel.prepare(user, { req }),
  //     token,
  //     data: {
  //       permit: PermitModel.prepare(permit, { req }),
  //     },
  //   });
  // }
  // async silent(req) {
  //   const UserModel = this.app.models.UserModel || this.app.models.User;
  //   const { login, params } = canonizeParams(req.data);
  //   const username = `__s${Date.now()}__`;
  //   const user = new UserModel({
  //     username,
  //     type: 'silent',
  //     ...params,
  //   });
  //   await user.save();
  //   req.user = user;
  //   return {
  //     __pack: 1,
  //     signup: true,
  //     user: await UserModel.prepare(user, { req, withAppState: true }),
  //     token: user.generateAuthToken(),
  //   };
  // }

  // async recovery(req) {
  //   const UserModel = this.app.models.UserModel || this.app.models.User;
  //   const { mailer } = this.app.modules;
  //   if (!mailer) throw 'Система не может отправить email';

  //   // const params = req.data;

  //   const criteria = this.getUserCriteria(req);
  //   const user = await UserModel.findOne(criteria);
  //   if (!user) throw req.e('Неверный логин', { status: 404 });
  //   const email = user.getEmail();
  //   if (!email) throw req.e('У этого пользователя не был указан емейл для восстановления', { status: 400 });

  //   const password = UserModel.generatePassword();

  //   await mailer.send({
  //     ...user.getMailerParams('primary'),
  //     template: 'recovery',
  //     // locale: user.locale || req.locale,
  //     // to: user.getEmail(),
  //     params: {
  //       user: user.toJSON(),
  //       password,
  //     },
  //   });

  //   await user.setPassword(password);
  //   await user.save();

  //   return {
  //     __pack: 1,
  //     emailSended: true,
  //   };
  // }

  async info() {
    const authModule = await this.app.module('auth');
    if (!authModule) return [];
    return {
      providers: map(authModule.strategies, (strategy, provider) => ({
        provider,
        ...omit(strategy.getInfo(), __DEV__ ? [] : ['settings', 'clientId']),
      })),
    };
  }

  async socialAuth(req, res, next) {
    const authModule = await this.app.module('auth');
    if (!authModule) throw '!authModule';
    const { provider } = req.params;
    const origin = getReqOrigin(req);
    const strategy = authModule.strategies[provider];
    if (!strategy) next(req.e('auth.providerInvalid'), { status: 404, provider });
    authModule.passportService.authenticate(
      provider,
      strategy.getPassportAuthenticateParams({ method: 'auth', origin }),
    )(req, res, next);
  }

  async socialCallback(req, res) {
    const authModule = await this.app.module('auth');
    if (!authModule) throw '!authModule';
    const { provider } = req.params;
    return new Bluebird((resolve, reject) => {
      authModule.passportService.authenticate(
        provider,
        authModule.strategies[provider].getPassportAuthenticateParams({ method: 'callback' }),
        async (err, data) => {
          console.log('socialCallback CALLBACK CALLBACK CALLBACK CALLBACK', err, data);
          if (err) return reject(err);
          return resolve(res.redirect(data.redirect || '/'));
        },
      )(req);
    });
  }

  // ////////////////////////

  async socialLogin(req) {
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const PassportModel = this.app.models.PassportModel || this.app.models.Passport;
    const passport = await PassportModel.getByToken(req.data.p);
    let user = await passport.getUser();
    if (!user) {
      const params = merge(
        { profile: passport.profile },
        // req.data, // meta
        {
          username: await passport.generateUsername(UserModel),
          // _id,
        },
      );
      // console.log({ params });
      user = new UserModel(params);
      // await user.save();
      user.updateFromPassport(passport, { req });
      await user.save();
      passport.userId = user._id;
      // console.log('passport.save before', passport);
      await passport.save();
    }
    req.user = user;

    return {
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  }

  async socialBind(req) {
    const { checkNotFound } = this.app.helpers;
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const PassportModel = this.app.models.PassportModel || this.app.models.Passport;
    const userId = req.user._id;
    const passport = await PassportModel.getByToken(req.data.p).then(checkNotFound);
    const user = await UserModel.findById(req.user._id).then(checkNotFound);
    if (passport.userId) throw req.e('passport.userId already exist', { status: 400 });
    passport.userId = userId;
    // user.passports.push(passport._id);
    await passport.save();
    await user.updateFromPassport(passport);
    await user.save();
    return PassportModel.find({
      userId,
    });
  }

  async getSocials(req) {
    const PassportModel = this.app.models.PassportModel || this.app.models.Passport;
    const userId = req.user._id;
    return PassportModel.find({
      userId,
    });
  }

  async passportsDetach(req) {
    await this.isAuth(req);
    const { PassportModel } = this.app.models;
    const { _id } = req.data;
    const passport = await PassportModel.findById(_id);
    if (String(passport.userId) !== String(req.user._id)) throw '!acl';
    await PassportModel.deleteOne({ _id: passport._id });
    // await passport.remove();
    return { ok: 1 };
  }

  async socialUnbind(req) {
    const { checkNotFound } = this.app.helpers;
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const PassportModel = this.app.models.PassportModel || this.app.models.Passport;
    const params = req.data;
    const userId = req.user._id;
    const user = await UserModel.findById(req.user._id).then(checkNotFound);

    // OR passportId: passport._id
    const findParams = {};
    if (params.passportId) findParams._id = params.passportId;
    if (params.provider) findParams.provider = params.provider;
    findParams.userId = userId;
    if (!findParams.passportId && !findParams.provider) {
      throw req.e('!findParams.passportId && !findParams.provider', { status: 400 });
    }
    const passport = await PassportModel.findOne(findParams).then(checkNotFound);
    if (passport.userId !== userId) throw req.e('Wrong user!', { status: 403 });
    passport.userId = null;
    // user.passports = user.passports.filter((pId) => {
    //   return pId && pId.toString() !== params.p;
    // });
    await passport.save();
    await user.save();
    return PassportModel.find({
      userId,
    });
  }

  async tokenLogin(req) {
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const token = req.data.t || req.data.token;
    if (!token) throw req.e('!token', { status: 400 });

    const user = await UserModel.tokenLogin({ token });
    if (!user) throw req.e('!user', { status: 404 });
    req.user = user;

    return {
      __pack: 1,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  }

  async phoneCode(req) {
    if (!this.app.modules.auth.config.sms) throw '!module.config.sms';
    const smsConfig = this.app.modules.auth.config.sms;

    const { phone } = req.data;
    const code = random(100000, 999999);
    this.lastCode = code;

    const smsText = `Ваш проверочный код: ${code}`;
    if (this.app.modules.auth.tbot) {
      this.app.modules.auth.tbot.notify(`Номер: ${phone}\n${smsText}`);
    }
    const text = transliterate(smsText);

    let res;
    // console.log('smsConfig.provider', smsConfig.provider);
    if (smsConfig.provider === 'bytehand') {
      const qs = {
        ...smsConfig.params,
        to: phone,
        text,
      };
      res = await this.app.api.fetch('http://bytehand.com:3800/send', { qs });
    } else if (smsConfig.provider === 'nexmo') {
      const body = {
        ...smsConfig.params,
        to: phone,
        text,
      };
      // console.log('https://rest.nexmo.com/sms/json', { body });
      res = await this.app.api.fetch('https://rest.nexmo.com/sms/json', {
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
  }

  phoneApprove(req) {
    if (!this.app.modules.auth.config.sms) throw '!module.config.sms';
    const { phone, code } = req.data;
    return { phone, code };
  }

  async phoneLogin(req) {
    if (!this.app.modules.auth.config.sms) throw '!module.config.sms';
    const { phone, code } = req.data;
    const UserModel = this.app.models.UserModel || this.app.models.User;
    if (
      !(
        (this.app.modules.auth.config.sms.defaultCode && code === this.app.modules.auth.config.sms.code) ||
        code === this.lastCode
      )
    ) {
      throw 'Код не верный';
    }

    let user = await UserModel.findOne({ username: phone });
    if (!user) {
      user = await UserModel.create({
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
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  }

  async getPassportByToken(req) {
    const PassportModel = this.app.models.PassportModel || this.app.models.Passport;

    return PassportModel.getByToken(req.data.p);
  }
  async getPermit(req) {
    const { _id } = req.data;
    if (!_id) throw '!_id';
    const { PermitModel } = this.app.models;
    const permit = await PermitModel.findOne({
      _id,
    });
    if (!permit) throw '!permit';
    if (permit.type === 'user.restorePassword') return PermitModel.prepare(permit, { req });
    if (!req.user || !req.user._id) throw '!userId';
    if (!permit) throw 'not found';
    if (this.app.hasGrant(req.user, 'superadmin') || String(permit.userId) === req.user._id) {
      return PermitModel.prepare(permit, { req });
    }
    throw '!permission';
  }
  async emailPermit(req) {
    const permitModule = await this.app.module('permit');
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const { PermitModel } = this.app.models;

    const { ObjectId } = this.app.db.Types;
    if (!req.user || !req.user._id) throw '!_id';
    let userId = req.user._id;
    if (req.data._id && req.data._id !== userId) {
      if (this.app.hasGrant(req.user, 'admin')) {
        userId = req.data._id;
      } else {
        throw '!permission';
      }
    }
    const user = await UserModel.findById(userId);
    if (!user) throw '!user';
    const { email } = req.data;
    if (!email || !validateEmail(email)) {
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
    const changeEmailTimeout = get(this, 'app.config.auth.changeEmailTimeout', 7 * 24 * 60 * 60 * 1000);
    const isTimeout = await PermitModel.countDocuments({
      activatedAt: {
        $exists: false,
      },
      expiredAt: {
        $gte: date,
      },
      'info.email': email,
      'info.userId': ObjectId(user._id),
      type: {
        $in: ['user.setEmail', 'user.changeEmail'],
      },
      createdAt: {
        $gte: +date - changeEmailTimeout,
      },
    });
    if (isTimeout) {
      throw 'timeout';
    }
    const emailExist = await UserModel.countDocuments({
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
    const code = await PermitModel.generateUniqCode({
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
    const permit = await PermitModel.createPermit({
      expiredAt: permitModule.createExpiredAt('emailVerifyStrong'),
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
    const eventType = `events.user.${type}Email${this.app.hasGrant(user, 'newUser') ? 'Old' : ''}`;
    this.app.emit(eventType, {
      type: eventType,
      targetUser: user,
      user,
      userId: user._id,
      permit,
      email,
      link: this.app.url(`/auth/confirm/email?code=${permit.code}`),
    });
    return PermitModel.prepare(permit, { req });
  }
  async confirmEmail(req) {
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const { PermitModel } = this.app.models;
    const { code } = req.data;
    if (!code) throw '!code';
    const permit = await PermitModel.findOne({
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
    const user = await UserModel.findById(permit.info.userId);
    if (!user) throw '!user';
    const emailExist = await UserModel.findOne({
      _id: {
        $ne: user._id,
      },
      email: permit.info.email,
    }).select(['email']);
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
    const permits = await PermitModel.find({
      _id: { $ne: permit._id },
      type: permit.type,
      userId: user._id,
    });
    await Bluebird.map(permits, (p) => {
      p.disabledAt = date; // eslint-disable-line no-param-reassign
      return p.save();
    });
    return permit;
  }
  async findOneByCode(req) {
    const { code } = req.data;
    if (!code) throw '!code';
    const { PermitModel } = this.app.models;
    const permit = await PermitModel.findOne({
      code,
    });
    if (!permit) throw '!permit';
    if (permit.type === 'user.restorePassword') return PermitModel.prepare(permit, { req });
    if (!req.user || !req.user._id) throw '!userId';
    if (!permit) throw 'not found';
    if (this.app.hasGrant(req.user, 'superadmin') || String(permit.userId) === req.user._id) {
      return PermitModel.prepare(permit, { req });
    }
    throw '!permission';
  }
}

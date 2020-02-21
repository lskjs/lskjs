// import validator from 'validator';
import merge from 'lodash/merge';
import random from 'lodash/random';
import set from 'lodash/set';
import map from 'lodash/map';
import omit from 'lodash/omit';
import unset from 'lodash/unset';
import get from 'lodash/get';
import validator from 'validator';
import BaseApi from '@lskjs/server-api';
import transliterate from '@lskjs/utils/transliterate';
import canonizeParams from '@lskjs/utils/canonizeParams';
import canonizePhone from '@lskjs/utils/canonizePhone';
import validatePhone from '@lskjs/utils/validatePhone';
import getReqDomain from '@lskjs/utils/getReqDomain';
import getReqOrigin from '@lskjs/utils/getReqOrigin';
import getReqUrl from '@lskjs/utils/getReqUrl';
import createHelpers from '../utils/createHelpers';

export default class Api extends BaseApi {
  constructor(...props) {
    super(...props);
    this.helpers = createHelpers(this);
  }
  getRoutes() {
    // const { isAuth } = this.app.middlewares;
    return {
      '/login': ::this.login,
      '/signup': ::this.signup, // POST
      '/recovery': ::this.recovery,
      '/updateToken': ::this.updateToken,

      // // '/loginToken': ::this.loginToken,
      '/email/approve': ::this.emailApprove, // (req, res) => res.redirect('/cabinet'));

      '/phone/code': ::this.phoneCode,
      '/phone/approve': ::this.phoneApprove,
      '/phone/login': ::this.phoneLogin,
      '/accountkit': ::this.accountkit,
      //
      '/status': ::this.status,
      '/check': ::this.check,
      '/confirm': ::this.confirm,

      // Регистрация пользователя через соц сеть
      '/social': ::this.getSocials, // isAuth,
      '/social/signup': ::this.socialLogin,
      '/social/login': ::this.socialLogin,
      '/social/bind': ::this.socialBind, // Добавление соц.сетей к пользователю // isAuth,
      '/social/unbind': ::this.socialUnbind, // isAuth,

      '/passport/getByToken': ::this.getPassportByToken,
      '/passports/detach': ::this.passportsDetach,
      '/restorePasswordPermit': ::this.restorePasswordPermit,
      '/confirmPassword': ::this.confirmPassword,
      '/getPermit': ::this.getPermit,

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
    if (!userId) throw this.app.e('auth.tokenIncorrect', { status: 404 });

    const user = await UserModel.findById(userId);
    if (!user) throw this.app.e('auth.userNotFound', { status: 404 });
    req.user = user;

    const token = this.helpers.generateAuthToken(user);
    return {
      __pack: 1,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token,
    };
  }

  async status(req) {
    await this.isAuth(req);
    const { _id } = req.user;
    const { UserModel } = this.app.models;
    const user = await UserModel.findOne({ _id });
    if (!user) throw this.app.e('auth.userNotFound', { status: 404 });
    const token = this.helpers.generateAuthToken(user);
    return {
      api: {
        v: 1,
        isExpired: false,
        actualApi: '/api',
      },
      // state: await this.app.getAppState(_id),
      token,
      status: await user.getStatus(),
      user: await UserModel.prepare(user, { req, view: 'extended' }),
    };
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
    if (!password) throw this.app.e('auth.passwordEmpty', { status: 400 });
    const user = await UserModel.findOne(this.getUserCriteria(req.data));
    if (!user) throw this.app.e('auth.loginIncorrect', { status: 400 });
    if (!(await this.helpers.verifyPassword(password, user.password))) {
      throw this.app.e('auth.passwordIncorrect', { status: 400 });
    }
    req.user = user;
    const token = this.helpers.generateAuthToken(user);
    // await this.helpers.updateLoginAt(user);
    return {
      __pack: 1,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token,
    };
  }

  async signup(req) {
    const { UserModel } = this.app.models;
    const { password, ...userFields } = req.data;
    const loginParams = canonizeParams(req.data);
    const criteria = this.getUserCriteria(loginParams);
    const existUser = await UserModel.findOne(criteria).select('_id');
    const loginField = Object.keys(criteria)[0];
    if (existUser) throw this.app.e(`auth.${loginField}Exists`, { status: 400 });
    const user = new UserModel({
      ...loginParams,
      ...userFields, // TODO validation
    });
    if (password) {
      await this.helpers.setPassword(user, password);
    }
    await user.save();
    req.user = user;
    const link = (await this.helpers.genereateEmailApprovedLink) ? this.helpers.genereateEmailApprovedLink(user) : null;
    this.app.emit('events.auth.signup', { user, link });
    const token = this.helpers.generateAuthToken(user);
    return {
      __pack: 1,
      signup: true,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token,
    };
  }

  async confirmPassword(req) {
    const { UserModel, PermitModel } = this.app.models;
    const { code, password } = req.data;
    if (!code) throw '!code';
    const permit = await PermitModel.findOne({
      type: 'user.restorePassword',
      code,
    });
    if (!permit) throw { code: 'invalidCode' };
    if (permit.activatedAt) throw { code: 'activated' };
    const date = new Date();
    if (date > permit.expiredAt) throw { code: 'expired' };
    const user = await UserModel.findById(permit.userId);
    if (!user) throw '!user';
    await permit.activate();
    await this.helpers.setPassword(user, password);
    set(user, 'private.lastUpdates.password', date);
    user.markModified('private.lastUpdates.password');
    await user.save();
    const token = this.helpers.generateAuthToken(user);
    return Promise.props({
      __pack: true,
      user: UserModel.prepare(user, { req }),
      token,
      data: {
        permit: PermitModel.prepare(permit, { req }),
      },
    });
  }

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

  async recovery(req) {
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const { mailer } = this.app.modules;
    if (!mailer) throw 'Система не может отправить email';

    // const params = req.data;

    const criteria = this.getUserCriteria(req);
    const user = await UserModel.findOne(criteria);
    if (!user) throw this.app.e('Неверный логин', { status: 404 });
    const email = user.getEmail();
    if (!email) throw this.app.e('У этого пользователя не был указан емейл для восстановления', { status: 400 });

    const password = UserModel.generatePassword();

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
  }

  async info(req) {
      console.log(444);

    const authModule = await this.app.module('auth');
    if (!authModule) return []
    // settings: 'https://developers.facebook.com/apps/341748562873675/dashboard/',
    // const providers = get(this, 'app.config.auth.providers', []);
    // console.log('authModule.strategies', authModule.strategies);
    
    return {
      providers: map(authModule.strategies, (strategy, provider) => ({
        provider,
        ...omit(strategy.getInfo(), __DEV__ ? [] : ['settings', 'clientId']),
      })),
    };
  }



  async socialAuth(req, res, next) {
    const authModule = await this.app.module('auth');
    if (!authModule) throw '!authModule'
    const { provider } = req.params;
    const origin = getReqOrigin(req);
    const strategy = authModule.strategies[provider];
    if (!strategy) next(this.app.e('auth.providerInvalid'), { status: 404, provider });
    authModule.passportService.authenticate(
      provider,
      strategy.getPassportAuthenticateParams({ method: 'auth', origin }),
    )(req, res, next);
  }

  async socialCallback(req, res) {
    const authModule = await this.app.module('auth');
    if (!authModule) throw '!authModule'
    const { provider } = req.params;
    return new Promise((resolve, reject) => {
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

  //////////////////////////

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
    if (passport.userId) throw this.app.e('passport.userId already exist', { status: 400 });
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

  async accountkit(req, res) {
    const { debug } = req.data;
    const { accountkit } = this.app.config.auth.providers;
    if (!accountkit) throw '!config.auth.accountkit';
    // eslint-disable-next-line import/no-extraneous-dependencies
    const Accountkit = require('node-accountkit');
    const { appId, appSecret, apiVersion, requireAppSecret } = accountkit;

    const csrf = 'qwertyui';

    if (__DEV__ && debug) {
      return res.send(`
<script src="https://sdk.accountkit.com/en_US/sdk.js"></script>

<input value="+7" id="country_code" />
<input placeholder="phone number" id="phone_number" value="9178292237"/>
<button onclick="smsLogin();">Login via SMS</button>
<div>OR</div>
<input placeholder="email" id="email"/>
<button onclick="emailLogin();">Login via Email</button>



<script>
  // initialize Account Kit with CSRF protection
  AccountKit_OnInteractive = function(){
    AccountKit.init(
      {
        appId:"${appId}", 
        state:"${csrf}", 
        version:"${apiVersion}",
        fbAppEventsEnabled:true,
        redirect:"http://localhost:8080/api/v5/auth/accountkit"
      }
    );
  };

  // login callback
  function loginCallback(response) {
    console.log('response', response);
    if (response.status === "PARTIALLY_AUTHENTICATED") {
      var code = response.code;
      var csrf = response.state;
     window.location='/api/v5/auth/accountkit?csrf=${csrf}&access_token=' + response.code;
      // Send code to server to exchange for access token
    }
    else if (response.status === "NOT_AUTHENTICATED") {
      // handle authentication failure
    }
    else if (response.status === "BAD_PARAMS") {
      // handle bad parameters
    }
  }

  // phone form submission handler
  function smsLogin() {
    var countryCode = document.getElementById("country_code").value;
    var phoneNumber = document.getElementById("phone_number").value;
    AccountKit.login(
      'PHONE', 
      {countryCode: countryCode, phoneNumber: phoneNumber}, // will use default values if not specified
      loginCallback
    );
  }


  // email form submission handler
  function emailLogin() {
    var emailAddress = document.getElementById("email").value;
    AccountKit.login(
      'EMAIL',
      {emailAddress: emailAddress},
      loginCallback
    );
  }
</script>
      `);
    }

    const { UserModel } = this.app.models;
    // eslint-disable-next-line camelcase
    const { access_token } = req.data;
    Accountkit.set(appId, appSecret, apiVersion);
    Accountkit.requireAppSecret(requireAppSecret);

    const data = await new Promise((resolve, reject) => {
      Accountkit.getAccountInfo(access_token, (err, resp) => {
        if (err) return reject(err);
        return resolve(resp);
      });
    });
    const phone = canonizePhone(data.phone.number);
    if (!validatePhone(phone)) throw this.app.e('auth.invalidPhone', { status: 400 });

    const provider = 'phone';
    const params = { phone };
    const operation = await this.getOperation(req, { provider, params });

    let user;
    if (operation === 'signup') {
      user = new UserModel(params);
      user.editedAt = new Date();
      user.signinAt = new Date();
    } else if (operation === 'login') {
      user = await UserModel.findOne(params);
      if (!user) throw '!user';
      user.signinAt = new Date();
    } else if (operation === 'attach') {
      if (!req.user) throw '!user';
      user = await UserModel.findById(req.user._id);
      if (!user) throw '!user';
      user.phone = phone;
      user.editedAt = new Date();
      const user2 = await UserModel.findOne(params);
      if (user2) throw 'HAS_BEEN_ATTACHED';
    } else {
      throw '!operation';
    }
    await user.save();
    const token = user.generateAuthToken();
    // console.log(`auth/accountkit ${user._id} ${token}`); // this.app.logger
    return {
      isNew: operation === 'signup',
      operation,
      token,
      status: await user.getStatus(),
      user: await UserModel.prepare(user, { req, view: 'extended' }),
    };
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
      throw this.app.e('!findParams.passportId && !findParams.provider', { status: 400 });
    }
    const passport = await PassportModel.findOne(findParams).then(checkNotFound);
    if (passport.userId !== userId) throw this.app.e('Wrong user!', { status: 403 });
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
    if (!token) throw this.app.e('!token', { status: 400 });

    const user = await UserModel.tokenLogin({ token });
    if (!user) throw this.app.e('!user', { status: 404 });
    req.user = user;

    return {
      __pack: 1,
      user: await UserModel.prepare(user, { req, withAppState: true }),
      token: user.generateAuthToken(),
    };
  }

  async approveEmail(req) {
    const UserModel = this.app.models.UserModel || this.app.models.User;
    return UserModel.findAndApproveEmail(req.data.t);
  }
  async approvedEmail(req) {
    console.log('DEPRECATED lsk-auth  approvedEmail => approveEmail');  //eslint-disable-line
    return this.approveEmail(req);
  }
  async emailApprove(req) {
    console.log('DEPRECATED lsk-auth  emailApprove => approveEmail'); //eslint-disable-line
    return this.approveEmail(req);
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
      expiredAt: PermitModel.makeExpiredAt(UserModel.changeEmailLiveTime),
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
    await Promise.map(permits, p => {
      p.disabledAt = date; // eslint-disable-line no-param-reassign
      return p.save();
    });
    return permit;
  }
  async restorePasswordPermit(req) {
    // console.log('123123123');
    const UserModel = this.app.models.UserModel || this.app.models.User;
    const { PermitModel } = this.app.models;
    const { email } = req.data;

    if (!email || !validator.isEmail(email)) {
      throw 'emailNotValid';
    }
    const user = await UserModel.findOne({ email }).select(['email']);
    if (!user) {
      throw 'notFound';
    }
    const date = new Date();
    const str = `${user._id}_${email}_${date.getTime()}`;
    const code = await PermitModel.generateUniqCode({
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
    const permit = await PermitModel.createPermit({
      expiredAt: PermitModel.makeExpiredAt(UserModel.restorePasswordLiveTime),
      type: 'user.restorePassword',
      userId: user._id,
      info: {
        userId: user._id,
        email,
      },
      code,
    });
    this.app.emit('events.auth.restorePassword', {
      type: 'events.auth.restorePassword',
      targetUser: user,
      user,
      permit,
      email,
      link: this.app.url(`/auth/permit/${permit._id}?code=${permit.code}`),
    });
    // console.log(this.app.url(`/auth/permit/${permit._id}?code=${permit.code}`), 'events.user.restorePassword');
    return PermitModel.prepare(permit, { req });
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

  async confirm(req) {
    const { code, permitId } = req.data;
    const { UserModel, PermitModel } = this.app.models;
    if (!code) throw '!code';
    // const permit = await PermitModel.findById(permitId);
    // if (!permit) throw this.e(404, 'Permit not found!');

    const permit = await PermitModel.findByCode(code, {
      _id: permitId,
      type: 'auth',
    });

    if (!permit) throw 'invalidCode';
    const { provider } = permit.info;
    if (!provider) throw '!provider';

    if (!permit.info[provider]) throw '!permit.info[provider]';
    const params = {
      [provider]: permit.info[provider],
    };

    const operation = await this.getOperation(req, { provider, params });

    let user;
    if (operation === 'signup') {
      user = new UserModel(params);
      user.editedAt = new Date();
      user.signinAt = new Date();
    } else if (operation === 'login') {
      user = await UserModel.findOne(params).sort({ createdAt: 1 });
      if (!user) throw '!user';
      user.signinAt = new Date();
    } else if (operation === 'attach') {
      if (!req.user) throw '!user';
      user = await UserModel.findById(req.user._id);
      if (!user) throw '!user';
      user[provider] = permit.info[provider];
      user.editedAt = new Date();
      const user2 = await UserModel.findOne(params);
      if (user2) throw 'HAS_BEEN_ATTACHED';
    } else {
      throw '!operation';
    }

    await permit.activate();
    await user.save();
    const token = user.generateAuthToken();
    // console.log(`auth/confirm ${user._id} ${token}`); // this.app.logger
    return {
      isNew: operation === 'signup',
      operation,
      token,
      status: await user.getStatus(),
      user: await UserModel.prepare(user, { req, view: 'extended' }),
    };
  }
}

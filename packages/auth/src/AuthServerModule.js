/* eslint-disable global-require */
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import Module from '@lskjs/module';
import { Passport } from 'passport';
// import onlineService from './onlineService';
import Api from './Api';

export default class AuthServerModule extends Module {
  name = 'AuthServerModule';
  constructor(props) {
    super(props);
    this.config = get(this, 'config.auth', {});
    this.Api = Api;
    this.api = new this.Api({ app: this });
  }

  // initOnlineService() {
  //   this.online = onlineService;
  //   this.online.save = async (_id, visitedAt) => {
  //     // console.log('this.online.save', _id, visitedAt);
  //     const { User: UserModel } = this.models;
  //     await UserModel.update({ _id }, { visitedAt });
  //   };
  //   // setInterval(() => {
  //   //   console.log('online users', this.online.count());
  //   // }, 10000);
  //   this.middlewares.parseUser = [
  //     this.middlewares.parseUser,
  //     (req, res, next) => {
  //       if (req.user && req.user._id && !req.headers.offline) {
  //         this.online.touchOnline(req.user._id);
  //       }
  //       next();
  //     },
  //   ];
  // }
  // getModels() {
  //   return require('./models').default(this, this);
  // }
  // getController() {
  //   return require('./controller').default(this, this);
  // }
  getStrategies() {
    return require('./strategies').default(this);
  }
  getPassportStrategy(passport) {
    const strategy = this.strategies[passport.provider];
    if (!strategy) {
        console.error('AuthModule !strategy');  //eslint-disable-line
    }
    return strategy;
  }
  async updatePassportTokens(passport, ...args) {
    const strategy = this.getPassportStrategy(passport);
    await strategy.updateTokens(passport, ...args);
  }
  async updatePassportData(passport) {
    const strategy = this.getPassportStrategy(passport);
    if (!strategy) return;
    // console.log('strategy.updateTokens', strategy.updateTokens);
    await strategy.updateTokens(passport);
    await strategy.updatePassport({
      passport,
    });
  }
  async init() {
    if (!this.config) {
      this.app.log.warn('config.auth is missing'); // eslint-disable-line no-console
      this.config = {};
    }

    // if (this.config.telegram) {
    //   this.tbot = require('./tbot').default(this, this);
    // }
    if (!this.config.socials) this.config.socials = {};
    this.models = this.getModels();
    // this.models.User = this.models.User;

    this.controller = this.getController();
    this.Strategy = require('./strategies/BaseStrategy').default(this, this);
    this.strategyProviders = this.getStrategies();
    this.strategies = {};

    this.passportService = new Passport();
    const providers = get(this, 'config.providers', {});
    // console.log({ providers });

    forEach(providers, config => {
      const { provider, type, ...strategyConfig } = config;
      // console.log({ provider, type });

      const StrategyProvider = this.strategyProviders[type];
      if (!StrategyProvider) return;
      const strategy = new StrategyProvider({
        parent: this,
        app: this.app,
        provider,
        type,
        config: strategyConfig,
      });
      // console.log({strategy});
      if (!strategy) return;
      this.strategies[provider] = strategy;
    });
  }

  async run() {
    // this.strategies = require('./strategies').default(this, this);
    // const { strategies } = this || {};
    this.log.trace('auth strategies', Object.keys(this.strategies));
    forEach(this.strategies || [], strategy => {
      this.passportService.use(strategy.getPassportStrategy());
    });
    // if (this.strategies) {
    //   forEach(this.strategies || [], (strategy) => {
    //     this.passport.use(strategy.getStrategy(strategy));
    //   });
    // }
    // this.app.use('/api/module/auth', require('./api/auth'));
    this.app.use('/api/module/auth', this.getApi());
  }

  // getApi() {
  //   const api = this.asyncRouter();
  //   const { isAuth } = this.middlewares;

  //   api.all('/login', this.controller.login);
  //   api.post('/signup', this.controller.signup);
  //   api.all('/recovery', this.controller.recovery);
  //   api.all('/updateToken', this.controller.updateToken);
  //   api.all('/loginToken', this.controller.loginToken);
  //   api.all('/email/approve', this.controller.emailApprove, (req, res) => res.redirect('/cabinet'));
  //   api.all('/phone/code', this.controller.phoneCode);
  //   api.all('/phone/approve', this.controller.phoneApprove);
  //   api.all('/phone/login', this.controller.phoneLogin);

  //   // Регистрация пользователя через соц сеть
  //   api.all('/social', isAuth, this.controller.getSocials);
  //   api.all('/social/signup', this.controller.socialLogin);
  //   api.all('/social/login', this.controller.socialLogin);
  //   api.all('/social/bind', isAuth, this.controller.socialBind); // Добавление соц.сетей к пользователю
  //   api.all('/social/unbind', isAuth, this.controller.socialUnbind);

  //   api.all('/passport/getByToken', this.controller.getPassportByToken);
  //   api.all('/restorePasswordPermit', this.controller.restorePasswordPermit);
  //   api.all('/confirmPassword', this.controller.confirmPassword);
  //   api.all('/getPermit', this.controller.getPermit);

  //   // social auth init
  //   api.get('/:provider', this.controller.socialAuth);
  //   api.get('/:provider/auth', this.controller.socialAuth);
  //   api.get('/:provider/callback', this.controller.socialCallback);

  //   return api;
  // }
}

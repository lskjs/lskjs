import _ from 'lodash';
import { Passport } from 'passport';
import onlineService from './server/onlineService';

export default (ctx) => {
  return class AuthModule {
    initOnlineService() {
      this.online = onlineService;
      // setInterval(() => {
      //   console.log('online users', this.online.count());
      // }, 10000);

      ctx.middlewares.parseUser = [
        ctx.middlewares.parseUser,
        (req, res, next) => {
          if (req.user && req.user._id) {
            // console.log('touchOnline');
            this.online.touchOnline(req.user._id);
          }
          next();
        },
      ];
    }
    getModels() {
      return require('./server/models').default(ctx, this);
    }
    getController() {
      return require('./server/controller').default(ctx, this);
    }
    getStrategies() {
      return require('./server/strategies').default(ctx, this);
    }
    async init() {
      this.config = _.get(ctx, 'config.auth', {});

      if (this.config.telegram) {
        this.tbot = require('./tbot').default(ctx, this);
      }


      if (!this.config.socials) this.config.socials = {};
      this.initOnlineService();
      this.models = this.getModels();
      ctx.models.User = this.models.User;

      this.controller = this.getController();
      this.Strategy = require('./server/Strategy').default(ctx, this);
      this.strategies = this.getStrategies();
      this._strategies = {};
      this.passport = new Passport();
    }
    async run() {
      // this.strategies = require('./strategies').default(ctx, this);
      // const { strategies } = this || {};
      _.forEach(this.strategies, (Strategy) => {
        if (!Strategy) return null;
        const strategy = new Strategy();
        if (!strategy) return null;
        const { providerName } = strategy;
        if (!this.config.socials[providerName]) return null;
        this._strategies[providerName] = true;
        this.passport.use(strategy.getStrategy(strategy));
      });
      // if (this.strategies) {
      //   _.forEach(this.strategies || [], (strategy) => {
      //     this.passport.use(strategy.getStrategy(strategy));
      //   });
      // }
      // ctx.app.use('/api/module/auth', require('./api/auth'));
      ctx.app.use('/api/module/auth', this.getApi());
    }


    getApi() {
      const api = ctx.asyncRouter();
      const { isAuth } = ctx.middlewares;

      api.all('/login', this.controller.login);
      api.post('/signup', this.controller.signup);
      api.all('/recovery', this.controller.recovery);
      api.all('/updateToken', this.controller.updateToken);
      api.all('/email/approve', this.controller.emailApprove, (req, res) => {
        return res.redirect('/cabinet');
      });
      api.all('/phone/code', this.controller.phoneCode);
      api.all('/phone/approve', this.controller.phoneApprove);
      api.all('/phone/login', this.controller.phoneLogin);

      // Регистрация пользователя через соц сеть
      api.all('/social', isAuth, this.controller.getSocials);
      api.all('/social/signup', this.controller.socialSign);
      api.all('/social/login', this.controller.socialLogin);
      api.all('/social/bind', isAuth, this.controller.socialBind); // Добавление соц.сетей к пользователю
      api.all('/social/unbind', isAuth, this.controller.socialUnbind);

      // social auth init
      api.get('/:provider', this.controller.socialAuth);
      api.get('/:provider/auth', this.controller.socialAuth);
      api.get('/:provider/callback', this.controller.socialCallback);

      return api;
    }
  };
};

import _ from 'lodash';
import { Passport } from 'passport';

export default (ctx) => {
  return class AuthModule {
    async init() {
      this.config = _.get(ctx, 'config.auth', {});
      if (!this.config.socials) this.config.socials = {};
      this.models = require('./server/models').default(ctx, this);
      ctx.models.User = this.models.User;

      this.controller = require('./server/controller').default(ctx, this);
      this.Strategy = require('./server/Strategy').default(ctx, this);
      this.strategies = require('./server/strategies').default(ctx, this);
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
      api.all('/email/approve', this.controller.emailApprove);

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

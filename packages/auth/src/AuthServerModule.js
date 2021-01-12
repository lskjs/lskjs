/* eslint-disable global-require */
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import Module from '@lskjs/module';
import { Passport } from 'passport';
import createHelpers from './utils/createHelpers';

export default class AuthServerModule extends Module {
  getStrategies() {
    return require('./strategies').default(this);
  }
  getPassportStrategy(passport) {
    const strategy = this.strategies[passport.provider];
    if (!strategy) {
      this.app.log.error('AuthModule !strategy');
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
    await super.init();
    if (!this.config.socials) this.config.socials = {};
    // this.models = this.getModels();

    this.helpers = createHelpers({ app: this.app }); // TODO: потом надо будет по другому кидать app, а еще лучше вообще не кидать

    this.strategyProviders = this.getStrategies();
    this.strategies = {};

    this.passportService = new Passport();
    const providers = get(this, 'config.providers', {});
    // console.log({ providers });

    forEach(providers, (config) => {
      const { provider, type, ...strategyConfig } = config;
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

  async getAuthSession(req) {
    const userId = req.user && req.user._id;
    if (!userId) return {};
    const { UserModel } = this.app.models;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) throw this.app.e('auth.userNotFound', { status: 404 });
    const token = this.helpers.generateAuthToken(user);
    return {
      // api
      // state: await this.app.getAppState(_id),
      // status: await user.getStatus(),
      _id: userId,
      token,
      user: await UserModel.prepare(user, { req, view: 'extended' }),
    };
  }

  async run() {
    this.log.debug('strategies', Object.keys(this.strategies));
    forEach(this.strategies || [], (strategy) => {
      this.passportService.use(strategy.getPassportStrategy());
    });
  }
}

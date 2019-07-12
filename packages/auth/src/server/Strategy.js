export default (ctx, module) => class Strategy {
  constructor(params) {
    Object.assign(this, params);
  }

  config = {};
  Strategy = null;
  type = null;

  getProviderId({ id } = {}) { // eslint-disable-line class-methods-use-this
    return id;
  }

  getPassportAuthenticateParams() { // eslint-disable-line class-methods-use-this
    return {};
  }

  Strategy = null
  getPassportStrategyConfig() {
    return {
      ...this.config,
      scope: this.config.scope || [],
      callbackURL: this.config.callbackURL || this.config.callbackUrl || ctx.url(`/api/module/auth/${this.provider}/callback`),
    };
  }


  async passportStrategyCallback(...args) {
    const [accessToken, refreshToken, profile] = args;
    const PassportModel = ctx.modules.auth.models.PassportModel || ctx.modules.auth.models.Passport;
    const providerId = this.getProviderId(profile);
    let passport = await PassportModel.findOne({
      provider: this.provider,
      providerId,
    });
    const params = {
      accessToken,
      refreshToken,
      profile,
      providerId,
    };
    if (!passport) {
      passport = await this.createPassport(params);
      params.isNew = true;
    }
    params.passport = passport;
    await this.updatePassport(params);
    await passport.save();
    params.redirect = this.getSuccessRedirect(params);
    return params;
  }

  // Using:
  // passport.use(strategy.getPassportStrategy());
  getPassportStrategy() {
    const config = this.getPassportStrategyConfig();
    const conf = {
      ...config,
      clientID: config.clientID || config.clientId,
    };

    const strategy = new this.Strategy(
      conf,
      (...args1) => {
        const [done, ...args2] = args1.reverse();
        const args = args2.reverse();
        this
          .passportStrategyCallback(...args)
          .then(data => done(null, data))
          .catch(err => done(err));
      },
    );

    strategy.name = this.provider;
    return strategy;
  }


  async createPassport({
    token, accessToken, refreshToken, providerId,
  }) {
    const PassportModel = module.models.PassportModel || module.models.Passport;
    return new PassportModel({
      type: this.type,
      provider: this.provider,
      providerId,
      token: token || accessToken,
      refreshToken,
    });
  }

  async updatePassport({ accessToken, refreshToken, passport }) {
    if (accessToken) passport.token = accessToken;
    if (refreshToken) passport.refreshToken = refreshToken;
    try {
      passport.profile = await this.getProfile(passport);
    } catch (err) {
      console.log('updatePassport err', err);
    }
    // return passport
  }
  //
  // async updateToken(passport) {
  //
  // }

  async updateTokens(passport) {
    // return passport;
  }

  async getProfile(passport) {
    return {};
  }

  getSuccessRedirect({ passport }) {
    return ctx.url(`/auth/passport?p=${passport.generateToken()}`);
  }
};

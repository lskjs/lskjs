export default (ctx, module) => class Strategy {
  constructor(params) {
    Object.assign(this, params);
  }

  config = {};
  Strategy = null;
  type = 'youtube';

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
    console.log('passportStrategyCallback args', args);

    const [accessToken, refreshToken, passportProfile] = args;
    // async passportStrategyCallback(accessToken, refreshToken, passportProfile) {
    const { Passport } = ctx.modules.auth.models;
    const providerId = this.getProviderId(passportProfile);
    let passport = await Passport.findOne({
      provider: this.providerName,
      providerId,
    });
    const params = {
      accessToken,
      refreshToken,
      passportProfile,
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
    return new this.Strategy(
      {
        ...config,
        clientID: config.clientID || config.clientId,
      },
      (...args1) => {
        const [done, ...args2] = args1.reverse();
        const args = args2.reverse();
        this
          .passportStrategyCallback(...args)
          .then(data => done(null, data))
          .catch(err => done(err));
      },
    );
  }


  async createPassport({
    token, accessToken, refreshToken, providerId,
  }) {
    const { Passport } = module.models;
    return new Passport({
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

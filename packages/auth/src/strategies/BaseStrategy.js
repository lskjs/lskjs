import pick from 'lodash/pick';

export default class Strategy {
  constructor(params) {
    Object.assign(this, params);
  }

  config = {};
  Strategy = null;
  type = null;

  url(path, options = {}) {
    const { origin } = options;
    if (origin) {
      return origin + path;
    }
    return this.app.url(path);
  }

  getInfo() {
    return {
      type: this.type,
      ...pick(this.config, ['clientId', 'clientID']),
    };
  }

  getProviderId({ id } = {}) {
    return id;
  }

  getCallbackUrl({ origin } = {}) {
    return (
      this.config.callbackURL || this.config.callbackUrl || this.url(`/api/auth/${this.provider}/callback`, { origin })
    );
  }
  getPassportAuthenticateParams({ method = 'auth', origin } = {}) {
    console.log('getPassportAuthenticateParams callbackURL', this.getCallbackUrl({ origin }));
    if (method === 'auth') {
      return { callbackURL: this.getCallbackUrl({ origin }) };
    }
    return {};
  }

  Strategy = null;
  getPassportStrategyConfig() {
    return {
      ...this.config,
      scope: this.config.scope || [],
      callbackURL: this.getCallbackUrl(),
    };
  }

  async passportStrategyCallback(...args) {
    const [accessToken, refreshToken, profile] = args;
    const { PassportModel } = this.app.models;
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

    const strategy = new this.Strategy(conf, (...args1) => {
      const [done, ...args2] = args1.reverse();
      const args = args2.reverse();
      this.passportStrategyCallback(...args)
        .then((data) => done(null, data))
        .catch((err) => done(err));
    });

    strategy.name = this.provider;
    return strategy;
  }

  async createPassport({ token, accessToken, refreshToken, providerId }) {
    const { PassportModel } = this.app.models;
    return new PassportModel({
      type: this.type,
      provider: this.provider,
      providerId,
      token: token || accessToken,
      refreshToken,
    });
  }

  async updatePassport({ accessToken, refreshToken, passport }) {
    /* eslint-disable no-param-reassign */
    if (accessToken) passport.token = accessToken;
    if (refreshToken) passport.refreshToken = refreshToken;
    try {
      passport.profile = await this.getProfile(passport);
    } catch (err) {
      this.app.log.warn('NOT OVERRIDED: Strategy.getProfile err', err);
    }
    /* eslint-enable no-param-reassign */
  }

  async updateTokens() {
    // passport
    this.app.log.warn('NOT OVERRIDED: Strategy.updateTokens');
    // return passport;
  }

  async getProfile() {
    // passport
    return {};
  }

  getSuccessRedirect(passport) {
    return this.url(`/auth/passport?p=${passport.generateToken()}`);
  }
}

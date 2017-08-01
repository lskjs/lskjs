export default (ctx, module) => class Strategy {

  static getPassportParams() {
    return { };
  }

  Strategy = null
  providerName = null
  getProviderId(passportProfile) {
    return passportProfile.id;
  }
  getStrategyConfig() {
    const config = ctx.config.auth.socials[this.providerName].config || {};
    if (!config.callbackURL) {
      config.callbackURL = `${ctx.config.url}/api/module/auth/${this.providerName}/callback`;
    }
    return config;
  }

  // @TODO: getPassportStrategy() {
  getStrategy() {
    return new this.Strategy(
      this.getStrategyConfig(),
      async (accessToken, refreshToken, passportProfile, done) => {
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
        params.redirect = this.getSuccessRedirect(params);
        return done(null, params);
      },
    );
  }

  async createPassport({ accessToken, refreshToken, profile, providerId }) {
    const { Passport } = module.models;
    const data = {
      provider: this.providerName,
      providerId,
      token: accessToken,
      refreshToken,
    };
    return new Passport(data);
  }

  async updatePassport({ accessToken, refreshToken, passport }) {
    passport.token = accessToken;
    passport.refreshToken = refreshToken;
    passport.profile = await this.getProfile(passport);
    return passport.save();
  }

  async updateToken(passport) {

  }

  async getProfile(passport) {
    return {};
  }

  getSuccessRedirect({ passport }) {
    return `${ctx.config.url}/auth/passport?p=${passport.generateToken()}`;
  }
};

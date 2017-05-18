export default (ctx, module) => class GeneralAuth {
  Strategy = null
  providerName = null
  getProviderId(profile) {
    return profile.id;
  }
  async getExtraData() {
    return {};
  }
  updateConfig(config) {
    return config;
  }
  // async createPassport({ accessToken, refreshToken, profile = {}, extraData, providerId }) {
  //   const { Passport } = ctx.modules.auth.models;
  //   const data = {
  //     provider: this.providerName,
  //     providerId,
//     profile,
  //   };
  //   const passport = new Passport(data);
  //   return passport.save();
  // }
  getStrategy() {
    const config = this.updateConfig(ctx.config.auth.socials[this.providerName].config);
    return new this.Strategy(
      config,
      async (accessToken, refreshToken, profile, done) => {
        const { Passport } = ctx.modules.auth.models;
        const providerId = this.getProviderId(profile);
        let passport = await Passport.findOne({
          provider: this.providerName,
          providerId,
        });
        if (passport) {
          return done(null, { accessToken, refreshToken, profile, passport });
        }
        const extraData = await this
        .getExtraData({
          accessToken,
          refreshToken,
          profile,
        });
        passport = await this.createPassport({
          accessToken,
          refreshToken,
          profile,
          extraData,
          providerId,
        });
        return done(null, { accessToken, refreshToken, profile, passport });
      },
    );
  }
};

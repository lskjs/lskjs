import Telegram from 'passport-telegram-official';
// import fetch from 'isomorphic-fetch2';

export default (ctx, { Strategy }) => class TelegramStrategy extends Strategy {
  Strategy = Telegram
  type = 'telegram'

  getProviderId({ username } = {}) {
    return username;
  }

  async passportStrategyCallback(req, user, done) {
    const PassportModel = ctx.modules.auth.models.PassportModel || ctx.modules.auth.models.Passport;
    const providerId = this.getProviderId(user);
    let passport = await PassportModel.findOne({
      provider: this.providerName,
      providerId,
    });
    const params = {
      req,
      user,
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
    return done(null, params);
  }

  async getProfile(user) {
    return {
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.photo_url,
      username: user.username,
    };
  }

  async updatePassport({ user, passport }) {
    // console.log('updatePassport EXTENDED', accessToken, refreshToken) ;
    const { User: UserModel } = ctx.models;
    if (user.hash) passport.token = user.hash;
    passport.profile = await this.getProfile(user, passport);
    // const data = await module.getPassportData(passport);
    passport.meta = user;
    await passport.save();
    await UserModel.updateFromPassport(passport);
    return passport;
  }
};

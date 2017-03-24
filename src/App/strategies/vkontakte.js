import getGeneralAuth from './GeneralAuth';
import Vkontakte from 'passport-vkontakte';
import fetch from 'isomorphic-fetch';
export default (ctx) => {
  const { Passport } = ctx.models;
  const GeneralAuth = getGeneralAuth(ctx);
  return class VkAuth extends GeneralAuth {
    Strategy = Vkontakte.Strategy
    providerName = 'vkontakte'
    updateConfig(config) {
      if (!config.callbackURL) {
        config.callbackURL = `${ctx.config.protocol}://${ctx.config.host}:${ctx.config.externalPort}/api/v1/auth/vkontakte/callback`;
      }
      return config;
    }
    async getExtraData({ accessToken, refreshToken, profile }) {
      const { fields = [
        'sex',
        'bdate',
        'city',
        'country',
        'photo_50',
        'photo_100',
        'photo_200',
        'photo_max_orig',
      ] } = ctx.config.auth.socials.vkontakte;
      const res = await fetch(
        `https://api.vk.com/method/users.get?fields=${fields.join(',')}&access_token=${accessToken}`,
      );
      const json = await res.json();
      return json.response[0];
    }
    async createPassport({ accessToken, refreshToken, profile, extraData = {}, providerId }) {
      const data = {
        provider: this.providerName,
        providerId,
        raw: extraData,
        token: accessToken,
        profile: {
          firstName: extraData.first_name,
          lastName: extraData.last_name,
          gender: extraData.sex === 1 ? 'female' : 'male',
          photos: [
            extraData.photo_50,
            extraData.photo_100,
            extraData.photo_200,
          ],
          avatar: extraData.photo_max_orig,
          city: extraData.city,
          country: extraData.country,
        },
      };
      console.log(data);
      const passport = new Passport(data);
      return passport.save();
    }
  };
};

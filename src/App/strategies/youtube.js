import getGeneralAuth from './GeneralAuth';
import Youtube from 'passport-youtube-v3';
// import fetch from 'isomorphic-fetch';
import _ from 'lodash';
export default (ctx) => {
  const { Passport } = ctx.models;
  const GeneralAuth = getGeneralAuth(ctx);
  return class VkAuth extends GeneralAuth {
    Strategy = Youtube.Strategy
    providerName = 'youtube'
    updateConfig(config) {
      if (!config.callbackURL) {
        config.callbackURL = `${ctx.config.protocol}://${ctx.config.host}:${ctx.config.externalPort}/api/v1/auth/${this.providerName}/callback`;
      }
      if (!config.scope) {
        config.scope = [
          'https://www.googleapis.com/auth/youtube.readonly',
        ];
      }
      return config;
    }
    async getExtraData({ accessToken, refreshToken, profile }) {
      return {};
    }
    async createPassport({ accessToken, refreshToken, profile, extraData = {}, providerId }) {
      const data = {
        provider: this.providerName,
        providerId,
        raw: extraData,
        token: accessToken,
        profile: {
          firstName: profile.displayName,
          avatar: _.get(profile, '_json.items[0].snippet.thumbnails.high.url'),
        },
      };
      console.log(data);
      const passport = new Passport(data);
      return passport.save();
    }
  };
};

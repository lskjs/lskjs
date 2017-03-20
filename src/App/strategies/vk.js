import Vkontakte from 'passport-vkontakte';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
export default (ctx) => {
  return {
    getProviderId: (profile) => {
      return profile.id;
    },
    getExtraData: async ({ accessToken, refreshToken, profile }) => {
      const { fields = [
        'sex',
        'bdate',
        'city',
        'country',
        'photo_max_orig',
      ] } = ctx.config.auth.socials.vkontakte;
      console.log(fields);
      const res = await fetch(
        `https://api.vk.com/method/users.get?fields=${fields.join(',')}&access_token=${accessToken}`,
      );
      const json = await res.json();
      return json.response[0];
    },
    createPassport: (ctx) => {
      return async ({ accessToken, refreshToken, profile, extraData = {}, providerId }) => {
        const { Passport } = ctx.models;
        const data = {
          provider: 'vkontakte',
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
        const passport = new Passport(data);
        return passport.save();
      };
    },
    updateConfig: (config) => {
      if (!config.callbackURL) {
        config.callbackURL = `${ctx.config.protocol}://${ctx.config.host}:${ctx.config.externalPort}/api/v1/auth/vkontakte/callback`;
      }
      console.log(config);
      return config;
    },
    getStrategy: strategy => new Vkontakte.Strategy(
      strategy.updateConfig(ctx.config.auth.socials.vkontakte.config),
      async (accessToken, refreshToken, profile, done) => {
        const { Passport } = ctx.models;
        const providerId = strategy.getProviderId(profile);
        let passport = await Passport.findOne({
          provider: 'vkontakte',
          providerId,
        });
        if (passport) {
          return done(null, { accessToken, refreshToken, profile, passport });
        }
        const extraData = await strategy
        .getExtraData({
          accessToken,
          refreshToken,
          profile,
        });
        const createPassport = strategy.createPassport(ctx);
        passport = await createPassport({
          accessToken,
          refreshToken,
          profile,
          extraData,
          providerId,
        });
        return done(null, { accessToken, refreshToken, profile, passport });
      },
    ),
  };
};

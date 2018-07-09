import Youtube from 'passport-youtube-v3';
import get from 'lodash/get';
import Api from 'apiquery';

export default (ctx, { Strategy, config }) => {
  return class YoutubeStrategy extends Strategy {
    Strategy = Youtube.Strategy
    providerName = 'youtube'

    getConfig() {
      const config = super.getConfig();
      if (!config.scope) {
        config.scope = [
          'https://www.googleapis.com/auth/youtube.readonly',
        ];
      }
      return config;
    }

    async updateTokens(passport) {
      // console.log('@@updateTokens');
      const ytConfig = get(config, 'socials.youtube.config');
      if (!ytConfig) return null;
      const api = new Api();
      const body = Api.qs.stringify({
        refresh_token: passport.refreshToken,
        client_id: ytConfig.clientID,
        client_secret: ytConfig.clientSecret,
        grant_type: 'refresh_token',
      });
      const res = await Api.fetch(
        'https://www.googleapis.com/oauth2/v4/token',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        }
      );
      const data = await res.json();
      const ret = {}
      // console.log('updateTokens', data);
      if (data.error) {
        throw {
          code: data.error,
          message: data.error_description,
          error: data,
        };
      }
      if (data.access_token) {
        // console.log('updateTokens.access_token', passport.token, data.access_token, passport.token === data.access_token);
        passport.token = data.access_token;
        ret.accessToken = data.access_token;
      }
      // TODO: сначала протестить
      if (data.refresh_token) {
        // passport.refreshToken = data.refresh_token;
        // __DEV__ && console.log('TODO: сначала протестить', passport.refreshToken, data.refresh_token);
        ret.refreshToken = data.refresh_token;
      }
      return ret;


      // if (!config.scope) {
      //   config.scope = [
      //     'https://www.googleapis.com/auth/youtube.readonly',
      //   ];
      // }
      // return config;
    }

    async getProfile(passport) {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${passport.providerId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${passport.token}`,
        },
      });
      const json = await response.json();
      const profile = {
        avatar: get(json, 'items[0].snippet.thumbnails.high.url'),
        title: get(json, 'items[0].snippet.title'),
      };

      if (profile.title) {
        const names = profile.title.split(' ')
        profile.firstName = names[0];
        profile.lastName = names.slice(1).join(' ');
      }

      return profile;
    }
  };
};

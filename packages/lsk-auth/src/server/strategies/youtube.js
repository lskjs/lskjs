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

    async updateTokens(passport, creds2) {
      // console.log('@@updateTokens');
      const ytConfig = get(config, 'socials.youtube.config', {});

      const creds = {};
      if (creds2 && (creds2.clientId || creds2.clientID) && creds2.clientSecret) {
        creds.clientId = creds2.clientId || creds2.clientID
        creds.clientSecret = creds2.clientSecret;
      } else {
        creds.clientId = ytConfig.clientId || ytConfig.clientID;
        creds.clientSecret = ytConfig.clientSecret;
      }
      // console.log({creds});
      const api = new Api();
      const body = Api.qs.stringify({
        refresh_token: passport.refreshToken,
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
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
      // console.log('updateTokens data', data);
      if (data.error) {
        if (data.error_description === 'Account has been deleted') {
          passport.status = 'removed';
        } else if (data.error_description === 'Token has been expired or revoked') {
          passport.status = 'expired';
        } else if (data.error === 'invalid_grant') {
          passport.status = 'invalid';
        } else if (data.error === 'unauthorized_client') {
          passport.status = 'unauthorized';
        } else {
          ctx.log.error('Passport update unknown error', data);
          passport.status = 'invalid';
        }
        passport.lastError = data;
        passport.lastErrorAt = new Date();

        throw {
          code: data.error,
          message: data.error_description,
          error: data,
        };
      }
      if (data.access_token) {
        passport.status = 'valid';
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

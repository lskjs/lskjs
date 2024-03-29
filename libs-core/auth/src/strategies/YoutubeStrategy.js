import fetch from 'isomorphic-fetch';
import get from 'lodash/get';
import Youtube from 'passport-youtube-v3';
import { stringify } from 'qs';

import BaseStrategy from './BaseStrategy';

export default class YoutubeStrategy extends BaseStrategy {
  Strategy = Youtube.Strategy;
  type = 'youtube';

  getPassportStrategyConfig() {
    const config = super.getPassportStrategyConfig();
    return {
      ...config,
      scope: config.scope && config.scope.length ? config.scope : ['https://www.googleapis.com/auth/youtube.readonly'],
    };
  }

  getInfo() {
    return {
      ...super.getInfo(),
      settings: `https://console.developers.google.com/apis/credentials/oauthclient/${this.config.clientId}?project=${this.config.project}`,
    };
  }

  async updateTokens(passport, creds2) {
    /* eslint-disable no-param-reassign */
    const ytConfig = this.config;

    const creds = {};
    if (creds2 && (creds2.clientId || creds2.clientID) && creds2.clientSecret) {
      creds.clientId = creds2.clientId || creds2.clientID;
      creds.clientSecret = creds2.clientSecret;
    } else {
      creds.clientId = ytConfig.clientId || ytConfig.clientID;
      creds.clientSecret = ytConfig.clientSecret;
    }
    const res = await fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stringify({
        refresh_token: passport.refreshToken,
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
        grant_type: 'refresh_token',
      }),
    });
    const data = await res.json();
    const ret = {};
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
        this.app.log.error('Passport update unknown error', data);
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
    /* eslint-enable no-param-reassign */
  }

  async getProfile(passport) {  //eslint-disable-line
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${passport.providerId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${passport.token}`,
        },
      },
    );
    const json = await response.json();
    const profile = {
      avatar: get(json, 'items[0].snippet.thumbnails.high.url'),
      title: get(json, 'items[0].snippet.title'),
    };

    if (profile.title) {
      const names = profile.title.split(' ');
      profile.firstName = names[0];  // eslint-disable-line
      profile.lastName = names.slice(1).join(' ');
    }

    return profile;
  }
}

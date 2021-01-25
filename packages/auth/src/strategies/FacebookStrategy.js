// import fetch from 'isomorphic-fetch';
import axios from 'axios';
import get from 'lodash/get';
import Facebook from 'passport-facebook';

import BaseStrategy from './BaseStrategy';

export default class FacebookStrategy extends BaseStrategy {
  Strategy = Facebook.Strategy;
  type = 'facebook';

  async checkToken(accessToken) {
    const { data } = await axios(`https://graph.facebook.com/me?access_token=${accessToken}`);
    const { id: providerId, ...params } = data;
    return { ...params, providerId };
  }
  getInfo() {
    return {
      ...super.getInfo(),
      settings: `https://developers.facebook.com/apps/${this.config.clientId}/dashboard/`,
    };
  }

  async getProfile(passport) {  //eslint-disable-line
    const fields = [
      'gender',
      'picture.type(large)',
      'domains',
      'about',
      'link',
      'first_name',
      'last_name',
      'name',
      'birthday',
    ];
    const { data } = await axios(
      `https://graph.facebook.com/me?access_token=${passport.token}&fields=${fields.join(',')}`,
      {
        timeout: 3000,
      },
    );
    return {
      ...data,
      firstName: data.first_name,
      lastName: data.last_name,
      avatar: get(data, 'picture.data.url'),
      domain: data.id,
    };
  }
}

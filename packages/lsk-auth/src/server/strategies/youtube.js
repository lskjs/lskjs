import Youtube from 'passport-youtube-v3';
import _ from 'lodash';

export default (ctx, { Strategy }) => {
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

    async getProfile(passport) {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${passport.providerId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${passport.token}`,
        },
      });
      const json = await response.json();
      const profile = {
        avatar: _.get(json, 'items[0].snippet.thumbnails.high.url'),
        title: _.get(json, 'items[0].snippet.title'),
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

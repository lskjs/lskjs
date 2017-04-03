import getGeneralAuth from './GeneralAuth';
import Youtube from 'passport-youtube-v3';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import moment from 'moment';
export default (ctx) => {
  const { Passport } = ctx.models;
  const GeneralAuth = getGeneralAuth(ctx);
  return class VkAuth extends GeneralAuth {
    Strategy = Youtube.Strategy
    providerName = 'youtube'
    updateConfig(config) {
      if (!config.callbackURL) {
        config.callbackURL = `${ctx.config.url}/api/v1/auth/${this.providerName}/callback`;
      }
      if (!config.scope) {
        config.scope = [
          'https://www.googleapis.com/auth/youtube.readonly',
        ];
      }
      // console.log(config);
      return config;
    }
    async getExtraData({ accessToken, refreshToken, profile }) {
      return {};
    }
    async createPassport({ accessToken, refreshToken, profile, extraData = {}, providerId }) {
      // console.log('GET EMAIL');
      // await this.getEmail({ accessToken });
      // console.log('GET PROFILE');
      // await this.getProfile({ accessToken, providerId });
      // console.log('GET STATISTICS');
      // await this.getStatics({ accessToken, providerId });
      // console.log('GET VIDEOS');
      // await this.getAllVideos({ accessToken, providerId });
      // console.log('GET LAST VIDEO');
      // await this.getLastVideo({ accessToken, providerId });
      // console.log('GET ANALYTICS');
      // await this.getAnalytics({ accessToken, providerId });
      // await this.getAnalyticsForVideos({ accessToken, providerId });
      const data = {
        provider: this.providerName,
        providerId,
        raw: extraData,
        token: accessToken,
        profile: {
          email: await this.getEmail({ accessToken }),
          firstName: profile.displayName,
          avatar: _.get(profile, '_json.items[0].snippet.thumbnails.high.url'),
        },
        meta: {
          statics: await this.getStatics({ accessToken, providerId }),
          videos: await this.getAllVideos({ accessToken, providerId }),
          lastVideo: await this.getLastVideo({ accessToken, providerId }),
          analytics: await this.getAnalytics({ accessToken, providerId }),
          subscribers: await this.getSubscribers({ accessToken, providerId }),
        },
      };
      // console.log(data);
      const passport = new Passport(data);
      return passport.save();
    }
    async getEmail({ accessToken }) {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo?alt=json', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      return json;
      // console.log('================================');
      // console.log(json);
      // console.log('================================');
    }
    async getProfile({ accessToken, providerId }) {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${providerId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      // console.log('================================');
      // console.log(JSON.stringify(json, null, 4));
      // console.log('================================');
    }
    async getStatics({ accessToken, providerId }) {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${providerId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      // console.log('================================');
      // console.log(JSON.stringify(json, null, 4));
      // console.log('================================');
      return json;
    }
    async getSubscribers({ accessToken, providerId }) {
      let url = 'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet';
      url += `&channelId=${providerId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      return json;
    }
    async getAnalytics({ filters = [], dimensions = [], ...params }) {
      const analytics = await this.getData({
        ...params,
        metrics: [
          'averageViewDuration',
          'averageViewPercentage',
          'views',
          'likes',
          'dislikes',
          'comments',
          'subscribersGained',
        ],
        filters,
        dimensions,
      });
      if (analytics.columnHeaders && analytics.rows) {
        analytics.columnHeaders.forEach((column, i) => {
          analytics[column.name] = _.get(analytics, `rows[0][${i}]`, null);
        });
      }
      _.omit(analytics, ['columnHeaders', 'rows']);
      analytics.devices = await this.getDevices({ ...params });
      analytics.ageGender = await this.getAgeGender({ ...params });
      analytics.countries = await this.getCountries({ ...params });
      return analytics;
    }
    async getAllVideos({ accessToken, providerId }) {
      const maxResults = 50;
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&type=video&channelId=${providerId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      const { totalResults, resultsPerPage } = _.get(json, 'pageInfo', {});
      const pages = _.range(Math.ceil(totalResults / resultsPerPage) - 1);
      let { nextPageToken } = json;
      let videos = [];
      videos = _.concat(videos, json.items);
      await Promise.each(pages, () => {
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&type=video&order=date&channelId=${providerId}&nextPageToken=${nextPageToken}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => res.json())
        .then((data) => {
          nextPageToken = json.nextPageToken;
          // console.log('ITEMS', data.items);
          videos = _.concat(videos, data.items);
        });
      });
      // return videos;
      // console.log(JSON.stringify(videos, null, 4));
      // console.log(`Всего видео: ${videos.length}`);
      const promises = videos.map((video) => {
        return this
        .getVideoAnalytics({ accessToken, videoId: video.id.videoId })
        .then((analytics) => {
          video.analytics = analytics;
          return video;
        });
      });
      return Promise.all(promises);
    }
    dimentionToJson(dimensions) {
      const result = [];
      if (dimensions.rows && dimensions.columnHeaders) {
        dimensions.rows.forEach((row) => {
          const ageGender = {};
          dimensions.columnHeaders.forEach((column, i) => {
            ageGender[column.name] = row[i];
          });
          result.push(ageGender);
        });
      }
      return result;
    }
    async getLastVideo({ accessToken, providerId }) {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=date&type=video&channelId=${providerId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      const video = json.items[0];
      video.analytics = await this.getVideoAnalytics({
        accessToken,
        filters: [`videoId=${video.id.videoId}`],
      });
      return video;
    }
    async getAgeGender({ ...params }) {
      console.log(params, 'params');
      const data = await this.getData({
        ...params,
        metrics: ['viewerPercentage'],
        dimensions: ['gender', 'ageGroup'],
      });
      return this.dimentionToJson(data);
    }
    async getDevices({ ...params }) {
      console.log(params, 'params');
      const data = await this.getData({
        ...params,
        metrics: ['views'],
        dimensions: ['deviceType'],
      });
      return this.dimentionToJson(data);
    }
    async getCountries({ ...params }) {
      console.log(params, 'params');
      const data = await this.getData({
        ...params,
        metrics: ['views', 'averageViewDuration'],
        dimensions: ['country'],
      });
      return this.dimentionToJson(data);
    }
    async getData({ metrics = [], filters = [], dimensions = [], accessToken }) {
      let url = 'https://www.googleapis.com/youtube/analytics/v1/reports?';
      url += 'ids=channel==MINE';
      url += '&start-date=1990-01-01';
      url += `&end-date=${moment().format('YYYY-MM-DD')}`;
      if (metrics.length > 0) {
        url += `&metrics=${metrics.join(',')}`;
      }
      if (filters.length > 0) {
        url += `&filters=${filters.join(',')}`;
      }
      if (dimensions.length > 0) {
        url += `&dimensions=${dimensions.join(',')}`;
      }
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response);
      const data = await response.json();
      // console.log('-------------ANALYTICS-------------');
      // console.log(JSON.stringify(json, null, 4));
      // const data = {};
      // data.gener = await this.getGender({ accessToken, filters });
      // data.devices = await this.getDevices({ accessToken, filters });
      return data;
    }
    async getVideoAnalytics({ videoId, ...params }) {
      // console.log(`VIDEO ${videoId}`);
      const analytics = await this
      .getAnalytics({
        filters: [`video==${videoId}`],
        ...params });
      // console.log(JSON.stringify(analytics, null, 4));
      return analytics;
    }
  };
};

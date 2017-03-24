import config from 'lego-starter-kit/utils/config';
import baseConfig from 'lego-starter-kit/config';

export default config.server(baseConfig, {
  client: require('./client').default, // eslint-disable-line

  env: process.env.NODE_ENV || process.env.ENV || 'development',
  port: process.env.PORT || 8080,

  host: process.env.HOST || 'localhost',
  externalPort: process.env.EXTERNAL_PORT || 3000,
  protocol: process.env.PROTOCOL || 'http',

  db: {
    uri: process.env.DB || 'mongodb://s3.mgbeta.ru:10098/youtubers-dev',
  },
  jwt: {
    secret: 'REPLACE_ME_PLEASE',
  },
  auth: {
    socials: {
      vkontakte: {
        config: {
          clientID: '5717694',
          clientSecret: 'o1quBEHhCa8OwCKdmdH5',
        },
      },
      youtube: {
        config: {
          clientID: '201294679107-gln75259vurm2lkb366h9f6t3ekdm9v9.apps.googleusercontent.com',
          clientSecret: 'hXnkFH2F_kIP5zIKe7DVVeLu',
          scope: [
            'https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtube.force-ssl',
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/youtubepartner',
            'https://www.googleapis.com/auth/youtubepartner-channel-audit',
          ],
        },
      },
    },
  },
});

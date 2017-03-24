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
    uri: process.env.DB || 'mongodb://s3.mgbeta.ru:10098/lsk-example-2',
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
    },
  },
});

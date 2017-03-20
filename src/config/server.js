import config from 'lego-starter-kit/utils/config';
import baseConfig from 'lego-starter-kit/config';

export default config.server(baseConfig, {
  client: require('./client').default, // eslint-disable-line

  env: process.env.NODE_ENV || process.env.ENV || 'development',
  port: process.env.PORT || 8080,

  host: 'localhost',
  externalPort: 3000,
  protocol: 'http',

  db: {
    uri: process.env.DB || 'mongodb://lsk-example1:lsk-example1-pass@publicdb.mgbeta.ru:27000/lsk-example1',
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

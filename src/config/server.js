import config from 'lego-starter-kit/utils/config';
export default config.init({
  client: require('./client').default,
  remoteConfig: false,

  log: {
    level: __DEV__ ? 'debug' : 'error',
  },
  port: process.env.PORT || 8080,
  url: 'http://localhost:3000',
  db: {
    uri: 'mongodb://publicdb.mgbeta.ru:27000/lsk-master',
  },
  jwt: {
    secret: 'replaceMyPlease',
  },
  // ws: {
  //   transports: ['websocket'],
  // },
middlewares: require('./middlewares').default,
});

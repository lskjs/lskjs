import config from '../utils/configManager';
export default config.init({
  client: require('./client').default,
  remoteConfig: true,
  log: {
    level: __DEV__ ? 'trace' : 'error',
  },
  port: process.env.PORT || 8080,
  // url: 'http://localhost:3000',
  jwt: {
    secret: 'PLEASE_REPLACE_ME',
  },
  // ws: {
  //   transports: ['websocket'],
  // },
  middlewares: require('./middlewares').default,
});

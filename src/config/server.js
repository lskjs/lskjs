import config from 'lego-starter-kit/utils/config';

export default config.server({
  client: require('./client').default,
  port: process.env.PORT || 8080,
  host: 'localhost',
  db: {
    uri: 'mongodb://publicdb.mgbeta.ru:27000/lsk-master',
  },
  jwt: {
    secret: 'replaceMyPlease',
  },
  // sockets: {
  //   transports: ['websocket'],
  // },
  middlewares: require('./middlewares').default,
});

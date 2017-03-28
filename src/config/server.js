import config from 'lego-starter-kit/config/server';
console.log(config);
export default config.extend({
  client: require('./client').default, // eslint-disable-line

  env: process.env.NODE_ENV || process.env.ENV || 'development',
  port: process.env.PORT || 8080,

  host: process.env.HOST || 'localhost',
  externalPort: process.env.EXTERNAL_PORT || 3000,
  protocol: process.env.PROTOCOL || 'http',

  db: {
    uri: process.env.DB || 'mongodb://lsk-example1:lsk-example1-pass@publicdb.mgbeta.ru:27000/lsk-example1',
  },
  jwt: {
    secret: 'REPLACE_ME_PLEASE',
  },
  auth: {
    socials: require('./socials.js').default,
  },
  upload: {
    // @TODO: @andruxa externalPath (absolute)
    path: 'storage',
    // exteralPath: '/storage',
    allowGuest: true,
    // allowSetFilename: true,
    maxSize: '50mb',
    // prefix: 'file_',
    // postfix: '',
    // formats: ['png', 'jpg', 'jpeg', 'gif'],
    mimetypes: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
  },
})
.extend((config) => {
  // console.log(2222, config);
  if (config.protocol === 'https') {
    config.url = `${config.protocol}://${config.host}`;
  } else {
    config.url = `${config.protocol}://${config.host}:${config.externalPort}`;
  }
  return config;
})
.extendEnv();

import config from 'lego-starter-kit/utils/config';
import baseConfig from 'lego-starter-kit/config';
const result = config.serverWithEnv(baseConfig, {
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
    allowSetFilename: true,
    maxSize: '50mb',
    prefix: 'file_',
    // postfix: '',
    // formats: ['png', 'jpg', 'jpeg', 'gif'],
    mimetypes: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
  },
});
if (result.protocol === 'https') {
  result.url = `${result.protocol}://${result.host}`;
} else {
  result.url = `${result.protocol}://${result.host}:${result.externalPort}`;
}
export default result;

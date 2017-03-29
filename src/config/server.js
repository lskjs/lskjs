import config from 'lego-starter-kit/config/server';
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
  mailer: {
    transport: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'example@gmail.com',
        pass: 'example',
      },
    },
    options: {
      from: '"example" <example@gmail.com>',
    },
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
.extendEnv();

import config from 'lego-starter-kit/config/server';
export default config.extend({
  client: require('./client').default, // eslint-disable-line

  port: process.env.PORT || 8080,
  url: process.env.URL || 'http://localhost:3000',

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
  sockets: {},
  upload: {
    // @TODO: @andruxa externalPath (absolute)
    path: 'storage',
    // exteralPath: '/storage',
    allowGuest: false,
    // allowSetFilename: true,
    maxSize: '50mb',
    // prefix: 'file_',
    // postfix: '',
    // formats: ['png', 'jpg', 'jpeg', 'gif'],
    mimetypes: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
  },
})
.extendEnv();

import fs from 'fs';
const dirname = `${__dirname}/..`;
const ctx = {
  env: process.env.NODE_ENV,
  debug: !process.argv.includes('--release'),
  verbose: process.argv.includes('--verbose'),
  // webpackStats: 'verbose',
  dirname,
  pkg: require('../package.json'),
  modules: require('./modules').default,
  deps: [
    'lego-starter-kit', 'lsk-general', 'lsk-admin',
    'lsk-auth', 'lsk-mailer', 'lsk-upload', 'lsk-chat', 'lsk-rating', 'lsk-notification',
  ].map(dep => ({
    name: dep,
    path: fs.realpathSync(`${dirname}/node_modules/${dep}/src`),
    alias: dep,
  })),
  alias: {
    react: fs.realpathSync(`${dirname}/node_modules/react`),
    'react-dom': fs.realpathSync(`${dirname}/node_modules/react-dom`),
    'bootstrap-sass': fs.realpathSync(`${dirname}/node_modules/bootstrap-sass`),
  },
};
export default ctx;

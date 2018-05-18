import fs from 'fs';
const dirname = `${__dirname}/..`;
const ctx = {
  env: process.env.NODE_ENV,
  debug: !process.argv.includes('--release'),
  verbose: process.argv.includes('--verbose'),
  webpackStats: 'verbose',
  webpackConfigDist: `${dirname}/build/webpack.config.js`,
  dirname,
  babelrc: JSON.parse(fs.readFileSync(`${dirname}/.babelrc`)),
  pkg: require('../package.json'),
  modules: require('./modules').default,
  deps: [
    'lego-starter-kit',
  ].map(dep => ({
    name: dep,
    path: fs.realpathSync(`${dirname}/node_modules/${dep}/src`),
    alias: dep,
  })),
  alias: {
  },
};
export default ctx;

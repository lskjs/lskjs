require('@babel/register');
require('@babel/polyfill');
const Runner = require('lsk-build').Runner;
const config = require('./config').default;
const webpackConfig = require('./webpack.config');
const ctx = config;
ctx.webpackConfig = webpackConfig;
const app = new Runner(ctx);
if (process.argv.length > 2) {
  const method = process.argv[2];
  app[method]().catch(err => console.error(err.stack));
}

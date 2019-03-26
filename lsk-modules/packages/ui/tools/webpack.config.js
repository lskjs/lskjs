require('@babel/register');
require('@babel/polyfill');
const ctx = require('./config').default;
const getWebpackConfig = require('@lskjs/build').getWebpackConfig;
const webpack = getWebpackConfig(ctx);
require('@lskjs/build').WebpackConfig.save(__dirname + '/_webpack.config.js', webpack);
module.exports = webpack;

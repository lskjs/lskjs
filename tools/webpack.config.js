require('babel-core/register');
const ctx = require('./config').default;
const getWebpackConfig = require('lsk-build').getWebpackConfig;
module.exports = getWebpackConfig(ctx);

require('@babel/register');
const ctx = require('./config').default;
const getWebpackConfig = require('lsk-build').getWebpackConfig;
module.exports = getWebpackConfig(ctx);

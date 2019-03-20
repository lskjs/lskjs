// import webpack from './__webpack.config';
// module.exports = webpack;
//
require('@babel/register');
const ctx = require('./config').default;
const getWebpackConfig = require('@lskjs/build').getWebpackConfig;
module.exports = getWebpackConfig(ctx);

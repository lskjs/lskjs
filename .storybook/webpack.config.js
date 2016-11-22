require('babel-core/register');
require('babel-polyfill');
const config = require('../tools/webpack.config').default;

module.exports = config[0];

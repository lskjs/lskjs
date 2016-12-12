require('babel-core/register');
require('babel-polyfill');
const config = require('./tools/webpack.config');
module.exports = config[1];

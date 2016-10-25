require('babel-core/register');
require('babel-polyfill');
const config = require('../webpack.config').default;

module.exports = config[0];

const config = require('../tools/webpack.config')[0];
config.module.rules[0].options = require('../.babelrc.js');
module.exports = config;

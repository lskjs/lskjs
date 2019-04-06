const babelJest = require('babel-jest'); // eslint-disable-line import/no-extraneous-dependencies
const babelOptions = require('./.babelrc.js');

module.exports = babelJest.createTransformer(babelOptions);

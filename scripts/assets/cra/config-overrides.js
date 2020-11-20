const eslintConfig = require('../.eslintrc.js');
const path = require('path');
process.env.DANGEROUSLY_DISABLE_HOST_CHECK = 'true';

module.exports = function override(config) {
  // ESLint loader config override
  config.module.rules[1].use[0].options.baseConfig = eslintConfig;

  // Babel loader with runtime
  const bLWR = config.module.rules[2].oneOf[1];
  config.module.rules[2].oneOf[1].options = {
    babelrc: false,
    cacheIdentifier: bLWR.options.cacheIdentifier,
    cacheDirectory: true,
    cacheCompression: false,
    compact: false,
    configFile: path.resolve(__dirname, '../.babelrc.js'),
  };

  // Babel loader without runtime
  const bLWoR = config.module.rules[2].oneOf[2];
  config.module.rules[2].oneOf[2].test = /\.(jsx?|mjs)$/;
  config.module.rules[2].oneOf[2].options = {
    babelrc: false,
    compact: false,
    configFile: path.resolve(__dirname, '../.babelrc.js'),
    cacheDirectory: true,
    cacheCompression: false,
    cacheIdentifier: bLWoR.options.cacheIdentifier,
    sourceMaps: true,
    inputSourceMap: true
  };

  return config;
};

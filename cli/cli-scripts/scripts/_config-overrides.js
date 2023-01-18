/* eslint-disable no-param-reassign */
process.env.DANGEROUSLY_DISABLE_HOST_CHECK = 'true';

module.exports = function override(config) {
  // require('fs').writeFileSync('cra-config.json', JSON.stringify(config, null, 2));
  const { rules } = config.module;
  const { oneOf } = rules[1];

  oneOf.forEach((item) => {
    if (!(item && item.options && item.options.babelrc === false)) return;
    const isRuntime = item.exclude && String(item.exclude).includes('runtime');
    // console.log('BEFORE', item)
    if (isRuntime) {
      item.test = /\.(jsx?|mjs)$/;
      item.options = {
        ...item.options,
        configFile: require('path').resolve(__dirname, '../.babelrc.js'),
      };
    } else {
      // Babel loader with runtime
      item.options = {
        ...item.options,
        configFile: require('path').resolve(__dirname, '../.babelrc.js'),
      };
    }
    // console.log('AFTER', item)
  });

  config.plugins.forEach((item) => {
    if (!item.eslintPath) return;
    item.baseConfig = require('../../../.eslintrc.js');
  });

  return config;
};

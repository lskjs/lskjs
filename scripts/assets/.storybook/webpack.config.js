const babelrc = require('../.babelrc.js');
module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
  });
  config.resolve.extensions.push('.ts', '.tsx');
  const transformRuntimeIndex = babelrc.plugins.indexOf('@babel/plugin-transform-runtime');
  if (transformRuntimeIndex >= 0) {
    babelrc.plugins.splice(transformRuntimeIndex, 1);
  }
  config.module.rules[0].use[0].options.plugins = babelrc.plugins;
  return config;
};
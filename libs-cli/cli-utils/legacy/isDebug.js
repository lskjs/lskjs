const isDebug = () => process.env.DEBUG || process.env.USER === 'debug';

module.exports = {
  isDebug,
};

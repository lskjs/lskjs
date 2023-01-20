const { maxLen } = require('./config');

module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: maxLen - 20, // специально, чтобы начал ужиматься раньше, чем дойдет до лимита 120
  semi: true,
  singleQuote: true,
  endOfLine: 'lf',
};

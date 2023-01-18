const glob = require('glob');

const hasTs = (pattern) => {
  const list = glob.sync(pattern);
  return !!list.length;
};

module.exports = {
  hasTs,
};

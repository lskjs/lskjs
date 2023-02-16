const { hasTs } = require('./hasTs');

const hasTsHere = () => {
  const tsGrepPath = `${process.cwd()}/src/**/*.ts`;
  const isHasTs = hasTs(tsGrepPath) || hasTs(`${tsGrepPath}x`);
  return isHasTs;
};

module.exports = { hasTsHere };

const { findPath } = require('./findPaths');

const findBin = (command) => {
  if (command === 'babel') {
    return findPath('node_modules/@babel/cli/bin/babel.js') || `npx ${command}`;
  }
  const path = findPath(`node_modules/.bin/${command}`);
  if (path) return path;
  return `npx ${command}`;
};

module.exports = {
  findBin,
};

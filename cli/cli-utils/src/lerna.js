const { shell } = require('./shell');
const { findBin } = require('./findBin');

const lerna = (...args) => {
  const scopes = (process.env.SCOPE || process.env.PACKAGES || '').split(' ').filter(Boolean);
  const shellArgs = [
    // asd
    findBin('lerna'),
    '--loglevel warn',
    ...scopes.map((scope) => `--scope ${scope}`),
    ...args,
  ]
    .filter(Boolean)
    .join(' ');
  return shell(shellArgs);
};

module.exports = {
  lerna,
};

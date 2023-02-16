const { getPaths } = require('./getPaths');

const fs = require('fs');

const findPaths = (params = {}) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof params === 'string') params = { name: params };
  const paths = getPaths(params);
  return paths.filter((p) => fs.existsSync(p));
};

const findPath = (params = {}) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof params === 'string') params = { name: params };
  // const paths = findPaths(params);
  // return paths[0];
  // console.time('[getPaths]');
  const paths = getPaths(params);
  // console.timeEnd('[getPaths]');
  for (let i = 0; i < paths.length; i += 1) {
    if (fs.existsSync(paths[i])) return paths[i];
  }
  return null;
};

module.exports = {
  findPath,
  findPaths,
};

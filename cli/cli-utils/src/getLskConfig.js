/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable array-callback-return */
// const { findPath } = require('./findPaths');
const { log } = require('./log');
const ph = require('path');
const fs = require('fs');
const { getShortPath } = require('./getShortPath');
const { getRootPath } = require('./cwdInfo');

const rcs = {};

const getLskConfig = (options = {}) => {
  const { cwd = process.cwd() } = options;

  const paths = [
    ph.resolve(`${cwd}/.lskjs.js`),
    ph.resolve(`${cwd}/.lskjs.json`),
    ph.resolve(`${cwd}/../.lskjs.js`),
    ph.resolve(`${cwd}/../.lskjs.json`),
    ph.resolve(`${cwd}/../../.lskjs.js`),
    ph.resolve(`${cwd}/../../.lskjs.json`),
  ].filter((f) => fs.existsSync(f));
  // console.log('paths', paths);
  const path = paths[0];
  // const path = findPath({
  //   name: '.lskjs',
  //   exts: ['.js', '.json'],
  //   nodemodules: false,
  //   lskrc: false,
  //   ...options,
  // });
  if (!path) return {};
  try {
    const raw = require(path);
    const config = { path, rootPath: getRootPath({ path }), ...raw };
    if (!rcs[path]) {
      rcs[path] = config;
      log.trace('[load] lskrc', getShortPath(path));
    }
    return config;
  } catch (error) {
    console.error(`parse .lskjs.js err ${path}`, error);
    return {};
  }
};

module.exports = {
  getLskConfig,
};

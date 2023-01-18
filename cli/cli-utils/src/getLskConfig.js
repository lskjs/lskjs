/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable array-callback-return */
// const { findPath } = require('./findPaths');
const { log } = require('./log');
const ph = require('path');
const fs = require('fs');

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
    const config = require(path);
    log.trace('[lskrc]', path);
    return {
      path,
      ...config,
    };
  } catch (error) {
    console.error(`parse .lskjs.js err ${path}`, error);
    return {};
  }
};

module.exports = {
  getLskConfig,
};

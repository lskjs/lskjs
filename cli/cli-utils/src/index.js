// const { checkSoft } = require('./checkSoft');
// const { drawLogo } = require('../../cli/src/utils/getLogo');
const { findBin } = require('./findBin');
const { findPaths, findPath } = require('./findPaths');
const { getLskConfig } = require('./getLskConfig');
const { getNpmGlobal } = require('./getNpmGlobal');
const { getPaths } = require('./getPaths');
// const { getShortPath } = require('./getShortPath');
// const { hasCra } = require('./hasCra');
// const { hasTs } = require('./hasTs');
// const { hasTsHere } = require('./hasTsHere');
// const { isDebug } = require('./isDebug');
// const { isDev } = require('./isDev');
// const { lerna } = require('./lerna');
// const { lernaParallel } = require('./lernaParallel');
const { copy } = require('./copy');
// const { link } = require('./link');
const { joinArgs } = require('./joinArgs');
// const { linkAll } = require('./linkAll');
const { log } = require('./log');
const { mergePackageJson } = require('./mergePackageJson');
// const { packagePath } = require('./packagePath');
const { pathexec } = require('./pathexec');
const { replaceAll } = require('./replaceAll');
// const { rootPath } = require('./rootPath');
const { rsync } = require('./rsync');
const { run } = require('./run');
const { shell } = require('./shell');
const { shellParallel } = require('./shellParallel');
const cwdInfos = require('./cwdInfo');

module.exports = {
  // checkSoft,
  // drawLogo,
  findBin,
  findPath,
  findPaths,
  getLskConfig,
  getNpmGlobal,
  getPaths,
  // getShortPath,
  // hasCra,
  // hasTs,
  // hasTsHere,
  // isDebug,
  // isDev,
  // lerna,
  // lernaParallel,
  copy,
  joinArgs,
  // link,
  // linkAll,
  log,
  mergePackageJson,
  // packagePath,
  replaceAll,
  // rootPath,
  rsync,
  run,
  shell,
  shellParallel,
  pathexec,
  ...cwdInfos,
};

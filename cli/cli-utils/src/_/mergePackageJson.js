/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const pickBy = require('lodash/pickBy');
const isPlainObject = require('lodash/isPlainObject');
const { omitNull } = require('@lskjs/utils/omitNull');
const { isNotNull } = require('@lskjs/utils/isNotNull');
const { log } = require('./log');
const sortPackageJson = require('sort-package-json');

// TODO: отказаться от utils и lodash

const omitNullOrEmpty = (items) =>
  pickBy(items, (item) => {
    if (!isNotNull(item)) return false;
    if (isPlainObject(item)) return !!Object.keys(item).length;
    return true;
  });

const mergePackageJson = (target, base) => {
  const json = require(target);
  const baseJson = require(base);
  const newJson = sortPackageJson(
    omitNullOrEmpty({
      ...baseJson,
      ...json,
      scripts: omitNull({
        ...(json.scripts || {}),
        ...(baseJson.scripts || {}),
      }),
      dependencies: omitNull({
        ...(json.dependencies || {}),
        ...(baseJson.dependencies || {}),
      }),
      devDependencies: omitNull({
        ...(json.devDependencies || {}),
        ...(baseJson.devDependencies || {}),
      }),
      peerDependencies: omitNull({
        ...(json.peerDependencies || {}),
        ...(baseJson.peerDependencies || {}),
      }),
      optionalDependencies: omitNull({
        ...(json.optionalDependencies || {}),
        ...(baseJson.optionalDependencies || {}),
      }),
      ...pickBy(baseJson, (a) => !isNotNull(a)),
    }),
  );
  if (newJson) {
    require('fs').writeFileSync('./package.json', `${JSON.stringify(newJson, null, 2)}\n`);
  } else {
    log.error('!newJson');
  }
};

module.exports = {
  mergePackageJson,
};

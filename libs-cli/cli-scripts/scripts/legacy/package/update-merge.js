#!/usr/bin/env node
const { run, findPath, mergePackageJson } = require('@lskjs/cli-utils');

const main = async () => {
  const from = findPath('scripts/assets/package.json');
  if (!from) throw 'CANT FIND package.json';
  await mergePackageJson(`${process.cwd()}/package.json`, from);
};

run(main);

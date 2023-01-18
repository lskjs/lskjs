#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell, findPath, log } = require('@lskjs/cli-utils');

const main = async () => {
  const cwd = process.cwd();
  await shell('rm -rf cra/public/assets');
  // await shell('cp -R src cra/src');
  // await shell(`ln -s ${cwd}/src ${cwd}/cra/src`);
  const publicAssets = findPath('public/assets');
  if (publicAssets) {
    await shell(`cp -R ${publicAssets} cra/public/assets`);
  } else {
    log.warn('public/assets not found, ignoring copy to cra/public/assets');
  }
  await shell('SKIP_PREFLIGHT_CHECK=true npm start', { cwd: 'cra' });
};

run(main);

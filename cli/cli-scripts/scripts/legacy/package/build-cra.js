#!/usr/bin/env node
/* eslint-disable no-console */

const { shell, run, rsync, log } = require('@lskjs/cli-utils');

const main = async () => {
  // const cwd = process.cwd();
  await shell('rm -rf cra/public/assets');
  // await shell('ln -s ../src cra/src');
  // await shell(`ln -s ${cwd}/src ${cwd}/cra/src`);
  // await shell('cp -R src cra/src');
  await shell('CI=false SKIP_PREFLIGHT_CHECK=true npm run build', {
    // await shell('CI=false npm run build', {
    cwd: 'cra',
  });
  log.info('OK - cra build');
  await shell('mkdir -p public');
  await rsync('cra/build/*', 'public/');
  await shell(`lsk run build:cra:extract`);
};

run(main);

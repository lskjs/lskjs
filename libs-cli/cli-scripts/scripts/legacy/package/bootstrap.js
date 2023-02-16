#!/usr/bin/env node
const { shell, run, rsync, hasCra, isDev, isDebug } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('rm -rf release build node_modules');
  await shell('mkdir -p build');
  await shell('lsk run npm:install');
  await shell('mkdir -p node_modules');
  await rsync(['package.json', 'package-lock.json', 'yarn.lock', 'README.md'], 'build', {
    ignoreMissingFiles: true,
    cmd: 'cp',
  });
  if (hasCra()) {
    await shell('lsk run bootstrap:cra');
  }
  if (isDebug()) {
    await shell('lsk run npm:update:check');
  }
  if (isDev()) {
    await shell('lsk run bootstrap:nodemodules');
  }
};

run(main);

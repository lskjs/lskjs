#!/usr/bin/env node
const { shell, run, findBin, isDebug } = require('@lskjs/cli-utils');

const main = async () => {
  if (isDebug()) {
    await shell(`${findBin('ncu')} -l error --dep=prod,dev,peer,optional`, {
      cwd: 'cra',
    });
  }
  await shell('lsk run npm:install', { cwd: 'cra' });
};

run(main);

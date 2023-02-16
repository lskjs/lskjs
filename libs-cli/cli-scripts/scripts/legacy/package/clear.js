#!/usr/bin/env node
const { shell, run, hasCra } = require('@lskjs/cli-utils');

const main = async () => {
  if (hasCra()) {
    await shell('rm -rf node_modules', {
      cwd: 'cra',
    });
  }
  await shell('rm -rf node_modules');
};

run(main);

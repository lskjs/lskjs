#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell, lerna } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  let args = argv.join(' ');
  if (process.env.BUMP || argv.force) {
    args += ' --force-publish=*';
  }
  await shell(`DIST=release lsk run build -- --since`);
  await lerna(`publish --exact --contents release ${args}`);
  await shell('lsk run release:after');
};

run(main);

#!/usr/bin/env node
const { run, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  const argv = process.argv.slice(2);
  await lerna(`exec -- lsk run test -- ${argv.join(' ')}`);
};

run(main);

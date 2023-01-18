#!/usr/bin/env node
const { run, shell, log } = require('@lskjs/cli-utils');

const main = async () => {
  log.trace('husky-pre-push');
  await shell(`ls`);
};

run(main);

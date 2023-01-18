#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell(`lsk run release -- --yes ${argv.join(' ')}`);
};

run(main);

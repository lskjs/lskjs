#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('rm -rf build/node_modules');
  await shell('ln -s node_modules build/node_modules');
};

run(main);

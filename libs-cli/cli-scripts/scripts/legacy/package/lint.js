#!/usr/bin/env node
const { run, shell, hasTsHere } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('lsk run lint:js');
  if (hasTsHere()) {
    await shell('lsk run lint:ts');
  }
};

run(main);

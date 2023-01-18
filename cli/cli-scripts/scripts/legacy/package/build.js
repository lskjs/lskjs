#!/usr/bin/env node
const { shell, hasCra, hasTsHere, run } = require('@lskjs/cli-utils');

const main = async () => {
  if (hasTsHere()) {
    await shell('lsk run build:ts');
  } else {
    await shell('lsk run build:js');
  }
  if (hasCra()) {
    await shell('lsk run build:cra');
  }
};

run(main);

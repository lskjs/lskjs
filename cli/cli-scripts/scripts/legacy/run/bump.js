#!/usr/bin/env node
const { run, lernaParallel } = require('@lskjs/cli-utils');

const main = async () => {
  await lernaParallel(`exec -- lsk run bump`);
};

run(main);

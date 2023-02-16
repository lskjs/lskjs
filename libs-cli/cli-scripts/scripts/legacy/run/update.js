#!/usr/bin/env node
const { run, shell, lernaParallel } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`lsk run update:contributors`);
  await shell(`lsk run update:readme`);
  await lernaParallel(`exec -- lsk run update`);
};

run(main);

#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`DIST=release lsk run build`);
  await shell(`npm publish release/`);
  await shell(`lsk run release:after`);
};

run(main);

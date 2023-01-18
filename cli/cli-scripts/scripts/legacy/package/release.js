#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`DIST=release lsk run build`);
  await shell(`lsk run publish`);
  await shell('lsk run release:after');
};

run(main);

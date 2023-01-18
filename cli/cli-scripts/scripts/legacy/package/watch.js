#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`WATCH=1 lsk run build`);
};

run(main);

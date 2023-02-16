#!/usr/bin/env node
const { run, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await lerna(`exec -- lsk run dev:server`);
};

run(main);

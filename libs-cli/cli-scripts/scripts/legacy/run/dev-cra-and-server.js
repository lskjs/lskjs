#!/usr/bin/env node
/* eslint-disable no-console */
const { run, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await lerna(`exec -- lsk run dev:cra-and-server`);
};

run(main);

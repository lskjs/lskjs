#!/usr/bin/env bash
const { shell, run, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await lerna(`exec -- lsk run clear`);
  await shell(`rm -rf node_modules`);
};

run(main);

#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`pnpm -r exec lsk run bump`);
};

module.exports = run(main);

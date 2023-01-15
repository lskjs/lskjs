#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell('npx eslint --fix package.json scripts');
  await shell('pnpm -r exec lsk run fix');
};

module.exports = run(main);

#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell('lsk run clean');
  await shell('lsk run build --production');
  await shell('lsk run test');
  await shell('clean-publish --package-manager pnpm -- --no-git-checks');
};

module.exports = run(main);

#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv, isRoot } = {}) => {
  // await shell('lsk run clean');
  await shell('lsk run build --prod --silent');
  await shell('lsk run test --prod --silent');
  if (isRoot) {
    console.log('root');
  } else {
    await shell('clean-publish --package-manager pnpm -- --no-git-checks');
  }
};

module.exports = run(main);

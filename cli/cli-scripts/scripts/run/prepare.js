#!/usr/bin/env node
const { run, shell, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ ctx, args, isRoot } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run prepare', { ctx, args });
    return;
  }
  await shell('lsk run publish --without-publish', { ctx, args });
};

module.exports = run(main);

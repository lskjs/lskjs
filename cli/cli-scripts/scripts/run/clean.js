#!/usr/bin/env node
const { run, shell, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx, cwd } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run clean', { ctx });
    return;
  }
  await shell(`rm -rf ${cwd}/lib/* ${cwd}/coverage ${cwd}/.package`, { ctx });
};

module.exports = run(main);

#!/usr/bin/env node
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:eslint', { ctx });
  } else {
    await shell(`${findBin('eslint')} src`, { ctx });
  }
};

module.exports = run(main);

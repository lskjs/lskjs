#!/usr/bin/env node
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx } = {}) => {
  if (isRoot) {
    await shell(`${findBin('eslint')} --fix package.json`, { ctx });
    await shellParallel('lsk run test:eslint-fix', { ctx });
  } else {
    await shell(`${findBin('eslint')} --fix package.json src`, { ctx });
  }
};

module.exports = run(main);

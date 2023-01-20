#!/usr/bin/env node
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');
const { isDev, isCI } = require('@lskjs/env');

const main = async ({ isRoot, ctx, args } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:eslint', { ctx });
    return;
  }
  let cmd = `${findBin('eslint')} src`;
  const isSilent = args.includes('--silent') || isCI;
  const isProd = !isDev || args.includes('--prod');
  if (isProd || isSilent) cmd += ' --quiet';
  await shell(cmd, { ctx });
};

module.exports = run(main);

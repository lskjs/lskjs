#!/usr/bin/env node
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');
const { isDev, isCI } = require('@lskjs/env');

const main = async ({ isRoot, ctx, args } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:eslint', { ctx });
    return;
  }
  let cmd = `${findBin('eslint')} src`;
  const isProd = !isDev || !!+process.env.LSK_PROD || args.includes('--prod');
  const isSilent = !!+process.env.LSK_SILENT || args.includes('--silent') || isCI;
  if (isProd || isSilent) cmd += ' --quiet';
  await shell(cmd, { ctx });
};

module.exports = run(main);

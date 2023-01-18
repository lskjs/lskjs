#!/usr/bin/env node
const { isCI, isDev } = require('@lskjs/env');
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx, args } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:size-limit', { ctx });
    return;
  }
  const isSilent = args.includes('--silent') || isCI || !isDev;
  let cmd = findBin('size-limit');
  if (isSilent) cmd += ' --silent';
  await shell(cmd, { ctx });
};

module.exports = run(main);

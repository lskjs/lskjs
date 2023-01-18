#!/usr/bin/env node
const { run, shell, shellParallel, findBin } = require('@lskjs/cli-utils');

const main = async ({ args, isRoot, ctx } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run publish', { ctx, args });
    return;
  }
  let cmd = findBin('clean-publish');
  const isDryRun =
    args.includes('--dry-run') || args.includes('--without-publish');
  if (isDryRun) {
    cmd += '--without-publish  --temp-dir .release';
  } else {
    cmd += '--package-manager  -- --no-git-checks';
  }
  await shell(cmd, {
    ctx,
  });
};

module.exports = run(main);

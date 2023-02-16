#!/usr/bin/env node
const { run, shellParallel, shell } = require('@lskjs/cli-utils');
// const { existsSync } = require('fs');

const main = async ({ args, isRoot, ctx } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run publish', { ctx, args });
    return;
  }
  const isDryRun = args.includes('--dry-run') || args.includes('--without-publish');
  let cmd = 'pnpm publish .release --no-git-checks';
  if (isDryRun) cmd += ' --dry-run';
  await shell(cmd, { ctx });
  // throw new Error('not implemented');
  // await shell('rm -rf .release');
  // let cmd = findBin('clean-publish');
  // if (isDryRun) {
  //   cmd += ' --without-publish --temp-dir .release';
  // } else {
  //   cmd += ' --package-manager pnpm  --temp-dir .release -- --no-git-checks';
  // }
  // await shell(cmd, {
  //   ctx,
  // });
};

module.exports = run(main);

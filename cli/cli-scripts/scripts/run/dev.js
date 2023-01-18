#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx, args }) => {
  if (isRoot) {
    await shell(`pnpm -r run dev`, { ctx, args });
    return;
  }
  await shell('lsk run build --watch', { ctx, args });
  // const { isJs, isTs, isNest } = getCwdInfo({ cwd });
  // if (isNest) {
  //   wasBuild = 1;
  // } else if (isJs) {
  //   await shell('lsk run build:js --watch', { ctx });
  //   wasBuild = 1;
  // } else if (isTs) {
  //   await shell('lsk run build:ts --watch', { ctx });
  //   wasBuild = 1;
  // }
  // if (!wasBuild) {
  //   log.trace('build skip');
  // }
};

module.exports = run(main);

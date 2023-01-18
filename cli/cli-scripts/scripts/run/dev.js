#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
const { run, shell, getCwdInfo } = require('@lskjs/cli-utils');

const main = async ({ isRoot, cwd, log, ctx }) => {
  if (isRoot) {
    await shell(`pnpm -r run dev`);
    return;
  }
  let wasBuild;
  const { isJs, isTs, isNest } = getCwdInfo({ cwd });
  if (isNest) {
    await shell('lsk run build:nest --watch', { ctx });
    wasBuild = 1;
  } else if (isJs) {
    await shell('lsk run build:js --watch', { ctx });
    wasBuild = 1;
  } else if (isTs) {
    await shell('lsk run build:ts --watch', { ctx });
    wasBuild = 1;
  }
  if (!wasBuild) {
    log.trace('build skip');
  }
};

module.exports = run(main);

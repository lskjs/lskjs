#!/usr/bin/env node
const { shell, run, findBin, shellParallel, getCwdInfo } = require('@lskjs/cli-utils');

async function main({ isRoot, ctx, args, cwd }) {
  if (isRoot) {
    await shellParallel(`lsk run build:nest`, { ctx });
    return;
  }
  const isWatch = args.includes('--watch');
  const { isLib } = getCwdInfo({ cwd });
  let cmd = findBin('nest');
  if (!isLib) cmd = `${cmd} start --debug`;
  if (isWatch) cmd = `${cmd} --watch`;
  await shell(cmd, { ctx });
}

run(main);

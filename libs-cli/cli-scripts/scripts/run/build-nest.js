#!/usr/bin/env node
const { shell, run, findBin, shellParallel, getCwdInfo } = require('@lskjs/cli-utils');

async function main({ isRoot, ctx, args, cwd }) {
  if (isRoot) {
    await shellParallel(`lsk run build:nest`, { ctx, args });
    return;
  }
  const isWatch = args.includes('--watch');
  const { isApp } = getCwdInfo({ cwd });

  if (isApp && isWatch) {
    const cmd = `${findBin('nest')} start --watch --debug`;
    await shell(cmd, { ctx });
  } else {
    await shell('lsk run build:ts', { ctx, args });
  }
}

module.exports = run(main);

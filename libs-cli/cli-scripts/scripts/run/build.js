#!/usr/bin/env node
const { run, shell, getCwdInfo } = require('@lskjs/cli-utils');

async function main({ isRoot, log, cwd, args, ctx } = {}) {
  if (isRoot) {
    await shell(`pnpm -r run build --prod --silent`, { ctx, args });
    return;
  }
  const { isJs, isTs, isNest, isBabel } = getCwdInfo({ cwd });
  if (isNest) {
    await shell(`lsk run build:nest`, { ctx, args });
  } else if (isBabel) {
    await shell(`lsk run build:babel`, { ctx, args });
  } else if (isTs) {
    await shell(`lsk run build:ts`, { ctx, args });
  } else if (isJs) {
    log.debug('[skip] no need to build js projects');
  } else {
    log.error('UNKNOWN TYPE');
  }
}

module.exports = run(main);

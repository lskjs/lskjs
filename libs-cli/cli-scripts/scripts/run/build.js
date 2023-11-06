#!/usr/bin/env node
const { run, shell, getCwdInfo } = require('@lskjs/cli-utils');

const isSkip = (names) => {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(names)) names = [names];
  return !!names
    .map(
      (name) =>
        +process.env[`SKIP_${name.toUpperCase()}`] || +process.env[`NO_${name.toUpperCase()}`],
    )
    .filter(Boolean).length;
};

async function main({ isRoot, log, cwd, args, ctx } = {}) {
  if (isSkip(['build', 'builds'])) {
    log.warn('SKIP_BUILD');
    return;
  }
  if (isRoot) {
    const concurrency = process.env.PNPM_CONCURRENCY || 4;
    const cc = concurrency && concurrency !== 4 ? `--workspace-concurrency=${concurrency}` : '';
    await shell(`LSK_SILENT=1 pnpm -r ${cc} run build`, { ctx, args }); // NOTE: --prod --silent
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

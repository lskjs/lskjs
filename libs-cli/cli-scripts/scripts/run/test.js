#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

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

const main = async ({ isRoot, ctx, args, log } = {}) => {
  if (isSkip(['test', 'tests'])) {
    log.warn('SKIP_TEST');
    return;
  }
  if (isRoot) {
    const concurrency = process.env.PNPM_CONCURRENCY || 4;
    await shell(
      `pnpm -r run test --prod --silent ${
        concurrency && concurrency !== 4 ? `--workspace-concurrency ${concurrency}` : ''
      }`,
      { ctx, args },
    );
    return;
  }
  await shell('lsk run test:jest', { ctx, args });
  await shell('lsk run test:eslint', { ctx, args });
  await shell('lsk run test:size-limit', { ctx, args });
};

module.exports = run(main);

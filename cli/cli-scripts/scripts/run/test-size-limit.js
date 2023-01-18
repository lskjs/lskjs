#!/usr/bin/env node
const { isCI } = require('@lskjs/env');
const { run, shell, findBin, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx, cwd, args, log } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:size-limit', { ctx });
    return;
  }
  // eslint-disable-next-line import/no-dynamic-require
  if (!require(`${cwd}/package.json`)['size-limit']) {
    log.debug('[skip] size-limit rc not found');
    return;
  }
  const isSilent = args.includes('--silent') || isCI;
  let cmd = findBin('size-limit');
  if (isSilent) cmd += ' --silent';
  await shell(cmd, { ctx });
};

module.exports = run(main);

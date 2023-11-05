#!/usr/bin/env node
const { run, shell, findBin, shellParallel, getCwdInfo } = require('@lskjs/cli-utils');
const { isCI, isDev } = require('@lskjs/env');
const { existsSync } = require('fs');

const omit = (obj, keys) => {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};

const main = async ({ isRoot, cwd, ctx, args, log } = {}) => {
  if (isRoot) {
    await shellParallel('lsk run test:jest', { ctx, args });
    return;
  }
  // eslint-disable-next-line import/no-dynamic-require
  if (!require(`${cwd}/package.json`).jest) {
    log.debug('[skip] jest rc not found in package.json');
    return;
  }
  const isProd = !isDev || args.includes('--prod');
  const isWatch = args.includes('--watch');
  const isSilent = args.includes('--silent') || isCI;
  let cmd = findBin('jest');
  cmd += ' --detectOpenHandles --coverage';
  if (!isWatch) cmd += ' --forceExit --runInBand';
  const { rootPath } = getCwdInfo({ cwd });
  const jestConfigPath = `${rootPath}/scripts/jest.config.js`;
  if (isProd || isSilent) cmd += ' --silent';
  if (isSilent) cmd += ' --ci';
  if (isWatch) cmd += ' --watch';
  if (jestConfigPath && existsSync(jestConfigPath)) {
    cmd += ` --config ${jestConfigPath}`;
  }
  cmd += ` --rootDir ${cwd}`;

  if (args.length) {
    const filteredArgs = args.filter((arg, i) => {
      if (['--prod', '--yes'].includes(arg)) return false;
      if (arg === '--workspace-concurrency') return false;
      // console.log({ arg, i, prev: args[i - 1] });
      if (args[i - 1] === '--workspace-concurrency') return false;
      return true;
    });

    cmd += ` ${filteredArgs.join(' ')}`;
    // console.log({ args, filteredArgs, cmd });
  }
  const tsconfigTestPath = `${cwd}/tsconfig.test.json`;
  const hasTsconfigTest = existsSync(tsconfigTestPath);
  if (hasTsconfigTest) cmd = `JEST_TSCONFIG=${tsconfigTestPath} ${cmd}`;
  const stdio = isSilent ? ['inherit', 'ignore', 'ignore'] : 'inherit';
  if (isWatch) {
    await shell(cmd, { ctx });
  } else {
    try {
      await shell(cmd, {
        ctx,
        stdio,
      });
    } catch (err) {
      if (!isSilent) throw err;
      // console.error('test:jest', err);
      log.fatal('test:jest', omit(err, ['proc']));
      await shell(cmd, { ctx });
    }
  }
};

module.exports = run(main);

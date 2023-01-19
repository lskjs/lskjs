#!/usr/bin/env node
const { run, shell, shellParallel, getCwdInfo, findBin } = require('@lskjs/cli-utils');
const { isCI, isDev } = require('@lskjs/env');

async function main({ isRoot, ctx, cwd, args } = {}) {
  if (isRoot) {
    await shellParallel(`lsk run buiild:ts`, { ctx });
    return;
  }
  const isSilent = args.includes('--silent') || isCI;
  const isWatch = args.includes('--watch');
  const isProd = !isDev || args.includes('--prod');
  const { isLib } = getCwdInfo({ cwd });
  let cmd = findBin('tsup src');
  if (isSilent) cmd += ' --silent';
  if (isWatch) cmd += ' --watch';
  if (isProd) cmd = `NODE_ENV=production ${cmd}`;
  // if (isProd) cmd += ' --env.NODE_ENV production';
  if (isWatch && !isLib) cmd += ' --onSuccess "node lib"';
  await shell(cmd, { ctx });
}

module.exports = run(main);

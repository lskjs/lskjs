#!/usr/bin/env node
const { run, shell, shellParallel, getCwdInfo, findBin } = require('@lskjs/cli-utils');
const { isCI, isDev } = require('@lskjs/env');
// const { log } = require('@lskjs/log/log');

async function main({ isRoot, ctx, cwd, args, log } = {}) {
  if (isRoot) {
    await shellParallel(`lsk run buiild:ts`, { ctx, args });
    return;
  }
  const isSilent = args.includes('--silent') || isCI;
  const isWatch = args.includes('--watch');
  const isProd = !isDev || args.includes('--prod');
  const { isLib } = getCwdInfo({ cwd });
  let cmd = '';
  if (isLib) {
    cmd = findBin('tsup');
    cmd += ' src';
    if (isSilent) cmd += ' --silent';
    if (isWatch) cmd += ' --watch';
  } else {
    const path = 'src/**';
    const ext = 'ts,tsx,js,jsx,mjs,cjs,json';
    cmd = 'ts-node src/index.ts';
    log.trace('watching path:', path);
    log.trace('watching extensions:', ext);
    log.debug('to restart at any time, enter `rs`');
    // 'nodemon --watch "src/**" --ext "ts,json" --ignore "src/**/*.spec.ts" --exec "ts-node src/index.ts"';
    cmd = `nodemon --watch "${path}" --ext "${ext}" --exec "${cmd}" --quiet`;
  }
  if (isProd) cmd = `NODE_ENV=production ${cmd}`;

  await shell(cmd, { ctx });
}

module.exports = run(main);

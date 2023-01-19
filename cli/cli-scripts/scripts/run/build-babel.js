#!/usr/bin/env node
const {
  shell,
  run,
  findBin,
  shellParallel,
  getCwdInfo,
} = require('@lskjs/cli-utils');

async function main({ isRoot, ctx, args, cwd }) {
  if (isRoot) {
    await shellParallel(`lsk run build:babel`, { ctx, args });
    return;
  }
  const isWatch = args.includes('--watch');
  const libDir = 'lib';
  if (!isWatch) await shell(`rm -rf ${libDir}`, { ctx, silence: 1 });
  await shell(`mkdir -p ${libDir}`, { ctx, silence: 1 });

  // const babelBin = 'node_modules/@babel/cli/bin/babel.js';
  // babel-watch
  const { isApp, isLib } = getCwdInfo({ cwd });
  let cmd;
  if (isApp && isWatch) {
    cmd = findBin('babel-node');
    cmd += ' src';
  } else {
    cmd = findBin('babel');
    cmd += ` src --out-dir ${libDir} --source-maps true --extensions ".js,.jsx,.ts,.tsx" --copy-files`;
    if (args.includes('--watch')) {
      cmd += ` --watch`;
    }
    // eslint-disable-next-line max-len
  }
  await shell(cmd, { ctx });
}

module.exports = run(main);

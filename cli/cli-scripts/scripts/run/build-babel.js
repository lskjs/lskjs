#!/usr/bin/env node
const { shell, run, findBin, shellParallel } = require('@lskjs/cli-utils');

async function main({ isRoot, ctx, args }) {
  if (isRoot) {
    await shellParallel(`lsk run build:babel`, { ctx, args });
    return;
  }
  const isWatch = args.includes('--watch');
  const libDir = 'lib';
  if (!isWatch) await shell(`rm -rf ${libDir}`, { ctx });
  await shell(`mkdir -p ${libDir}`, { ctx });

  // const babelBin = 'node_modules/@babel/cli/bin/babel.js';
  // babel-watch
  const babelBin = findBin('babel');
  let cmd = `${babelBin} src --out-dir ${libDir} --source-maps true --extensions ".js,.jsx,.ts,.tsx" --copy-files`;
  if (args.includes('--watch')) {
    cmd += ` --watch`;
  }
  // eslint-disable-next-line max-len
  await shell(cmd, { ctx });
}

module.exports = run(main);

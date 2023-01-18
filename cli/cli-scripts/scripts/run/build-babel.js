#!/usr/bin/env node
const { shell, run, findBin, shellParallel } = require('@lskjs/cli-utils');

const DIST = process.env.DIST || 'lib';
const BUILD_PARAMS = process.env.BUILD_PARAMS || '--copy-files';
async function main({ isRoot, ctx, args }) {
  if (isRoot) {
    await shellParallel(`lsk run build:js`, { ctx });
    return;
  }
  const isWatch = args.includes('--watch');
  if (!isWatch) await shell(`rm -rf ${DIST}`, { ctx });
  await shell(`mkdir -p ${DIST}`, { ctx });
  const params = `${BUILD_PARAMS} ${isWatch ? ' --watch' : ''}`;
  // const babelBin = 'node_modules/@babel/cli/bin/babel.js';
  // babel-watch
  const babelBin = findBin('babel');
  // eslint-disable-next-line max-len
  await shell(
    `${babelBin} src --out-dir ${DIST} --source-maps true --extensions ".js,.jsx,.ts,.tsx" ${params}`,
    {
      ctx,
    }
  );
}

run(main);

#!/usr/bin/env node
const { shell, run, findBin, rsync } = require('@lskjs/cli-utils');

const DIST = process.env.DIST || 'build';
const { WATCH = false } = process.env;
const BUILD_PARAMS = process.env.BUILD_PARAMS || '--copy-files';
async function main() {
  if (!WATCH) {
    await shell(`rm -rf ${DIST}`);
  }
  await shell(`mkdir -p ${DIST}`);
  await rsync(['package.json', 'package-lock.json', 'yarn.lock', 'README.md'], DIST, {
    ignoreMissingFiles: true,
    cmd: 'cp',
  });
  // --minified
  // const babel = "../../node_modules/@babel/cli/bin/babel.js";
  const params = `${BUILD_PARAMS} ${WATCH ? ' --watch' : ''}`;
  await shell(
    `${findBin('babel')} src --out-dir ${DIST} --source-maps true --extensions ".js,.jsx,.ts,.tsx" ${params}`,
  );
}

run(main);

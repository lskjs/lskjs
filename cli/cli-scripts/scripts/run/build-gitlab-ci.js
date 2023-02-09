#!/usr/bin/env node
const { run, shell, shellParallel } = require('@lskjs/cli-utils');
const fs = require('fs');

const { jsonToFile, getComment } = require('@lskjs/stringify');
const { getShortPath } = require('@lskjs/cli-utils/src/getShortPath');

async function main({ isRoot, log, ctx, cwd, config, args }) {
  if (isRoot) {
    await shellParallel(`lsk run build:gitlab-ci`, { ctx, args });
    await shell('lsk run build:gitlab-ci', { ctx, args, cwd: `${cwd}/apps` });
    await shell('lsk run build:gitlab-ci', { ctx, args, cwd: `${cwd}/libs` });
  }
  const { rootRepo, packages, rootPath } = config;
  const packagePath = cwd.replace(`${rootPath}/`, '').replace(rootPath, '');
  let name = packagePath.split('/').reverse()[0];
  if (name === 'packages' || name === 'apps' || cwd === rootPath) {
    name = null;
  }
  const inputFilename = `${packagePath}/.gitlab-ci.js`;
  const outputFilename = `${packagePath}/.gitlab-ci.yml`;
  if (!fs.existsSync(`${rootPath}/${inputFilename}`)) {
    log.trace('[skip]', getShortPath(inputFilename));
    return;
  }

  // eslint-disable-next-line import/no-dynamic-require
  const getConfig = require(`${rootPath}/${inputFilename}`);
  const data = getConfig({
    packages: name ? [{ name, path: packagePath }] : packages,
  });
  log.trace('[save]', ` ${getShortPath(inputFilename)} => ${getShortPath(outputFilename)}`);
  await jsonToFile(`${rootPath}/${outputFilename}`, data, {
    type: 'yml',
    comment: getComment({
      name: inputFilename,
      url: `${rootRepo}/${inputFilename}`,
    }),
  });
}

module.exports = run(main);

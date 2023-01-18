#!/usr/bin/env node
const { run, getLskConfig, shellParallel } = require('@lskjs/cli-utils');
const { getShortPath } = require('@lskjs/cli-utils/src/getShortPath');
const { jsonToFile, getComment } = require('@lskjs/stringify');
const { props } = require('fishbird');
const fs = require('fs');
// const { log } = require('@lskjs/log/log');

const main = async ({ isRoot, log, ctx, args } = {}) => {
  if (isRoot) {
    await shellParallel(`lsk run build:docker-stack`, { ctx, args });
    return;
  }
  const { rootRepo, envs = ['prod'], rootPath } = getLskConfig();
  const cwd = process.cwd();
  const packagePath = cwd.replace(`${rootPath}/`, '').replace(rootPath, '');
  const package = packagePath.split('/').reverse()[0];
  const inputFilename = `${packagePath}/docker-stack.js`;
  if (!fs.existsSync(`${rootPath}/${inputFilename}`)) {
    log.trace('[skip]', getShortPath(inputFilename));
    return;
  }
  // eslint-disable-next-line import/no-dynamic-require
  const getConfig = require(`${rootPath}/${inputFilename}`);
  await props(envs, async (env) => {
    const data = getConfig({ env, package });
    const postfix = env !== 'prod' ? `.${env}` : '';
    const outputFilename = `${packagePath}/docker-stack${postfix}.yml`;
    log.trace(
      '[save]',
      `env:${env} ${getShortPath(inputFilename)} => ${getShortPath(
        outputFilename
      )}`
    );
    await jsonToFile(`${rootPath}/${outputFilename}`, data, {
      type: 'yml',
      comment: getComment({
        name: outputFilename,
        url: `${rootRepo}/${inputFilename}`,
      }),
    });
  });
};

module.exports = run(main);

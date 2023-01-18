#!/usr/bin/env node
const { run, getLskConfig, shellParallel } = require('@lskjs/cli-utils');
const { jsonToFile, getComment } = require('@lskjs/stringify');
const { props } = require('fishbird');
const fs = require('fs');
// const { log } = require('@lskjs/log/log');

const main = async ({ isRoot, log } = {}) => {
  if (isRoot) {
    await shellParallel(`lsk run build-docker-stack`);
    return;
  }
  const { rootRepo, envs = ['prod'], cwd: rootCwd } = getLskConfig();
  const cwd = process.cwd();
  const packagePath = cwd.replace(`${rootCwd}/`, '');
  const package = packagePath.split('/').reverse()[0];
  const inputFilename = `${packagePath}/.gitlab-ci.js`;
  if (!fs.existsSync(`${rootCwd}/${inputFilename}`)) {
    log.trace('[skip]', inputFilename);
    return;
  }
  // eslint-disable-next-line import/no-dynamic-require
  const getConfig = require(`${rootCwd}/${inputFilename}`);
  await props(envs, async (env) => {
    const data = getConfig({ env, package });
    const postfix = env !== 'prod' ? `.${env}` : '';
    const outputFilename = `${packagePath}/docker-stack${postfix}.yml`;
    log.trace('[save]', `env:${env} ${inputFilename} => ${outputFilename}`);
    await jsonToFile(`${rootCwd}/${outputFilename}`, data, {
      type: 'yml',
      comment: getComment({
        name: outputFilename,
        url: `${rootRepo}/${inputFilename}`,
      }),
    });
  });
};

module.exports = run(main);

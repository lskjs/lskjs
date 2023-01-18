#!/usr/bin/env node
const { run, shell, shellParallel } = require('@lskjs/cli-utils');
const fs = require('fs');

const { jsonToFile, getComment } = require('@lskjs/stringify');

async function main(props = {}) {
  const { isRoot, log, ctx, cwd, config } = props;
  if (isRoot) {
    await shellParallel(`lsk run build-gitlab-ci`, { ctx });
    await shell('lsk run build-gitlab-ci', { ctx, cwd: `${cwd}/packages` });
    await shell('lsk run build-gitlab-ci', { ctx, cwd: `${cwd}/apps` });
  }
  const { rootRepo, packages, cwd: rootCwd } = config;
  const packagePath = cwd.replace(`${rootCwd}/`, '').replace(rootCwd, '');
  let package = packagePath.split('/').reverse()[0];
  if (package === 'packages' || package === 'apps' || cwd === rootCwd) package = null;
  const inputFilename = `${packagePath}/.gitlab-ci.js`;
  const outputFilename = `${packagePath}/.gitlab-ci.yml`;
  if (!fs.existsSync(`${rootCwd}/${inputFilename}`)) {
    log.trace('[skip]', inputFilename);
    return;
  }

  // eslint-disable-next-line import/no-dynamic-require
  const getConfig = require(`${rootCwd}/${inputFilename}`);
  const data = getConfig({
    packages: package ? [package] : packages,
    package,
    path: packagePath,
  });
  log.trace('[save]', `${inputFilename} => ${outputFilename}`);
  await jsonToFile(`${rootCwd}/${outputFilename}`, data, {
    type: 'yml',
    comment: getComment({
      name: inputFilename,
      url: `${rootRepo}/${inputFilename}`,
    }),
  });
}

module.exports = run(main);

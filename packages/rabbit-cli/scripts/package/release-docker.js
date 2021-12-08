#!/usr/bin/env node

const { run, shell, lerna } = require('@lskjs/cli-utils');
const {name, version} = require('../../package.json')

const main = async ({ argv } = {}) => {
  const dockerName = name.substr(1);
  const image = `${dockerName}:${version}`
  const tag = `${dockerName}:latest`

  await shell(`docker build -t ${image} .`);
  await shell(`docker tag ${image} ${tag}`);
  await shell(`docker push ${image}`);
  await shell(`docker push ${tag}`);
};

run(main);


#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ ctx, args }) => {
  await shell('lsk run build:docker-stack', { ctx, args });
  await shell('lsk run build:gitlab-ci', { ctx, args });
};

module.exports = run(main);

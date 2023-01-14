#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell('lsk run clean')
  await shell('NODE_ENV=production npm run build')
  await shell('npm run test')
  await shell('clean-publish')
};

module.exports = run(main);



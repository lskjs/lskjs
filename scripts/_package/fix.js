#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell('npx eslint --fix package.json src');
};

module.exports = run(main);

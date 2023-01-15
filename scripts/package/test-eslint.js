#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell('eslint src');
};

module.exports = run(main);

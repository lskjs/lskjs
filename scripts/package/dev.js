#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell('tsup --watch');
};

module.exports = run(main);

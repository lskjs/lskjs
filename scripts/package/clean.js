#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv } = {}) => {
  await shell('rm -rf ./lib/* && rm -rf ./coverage');
};

module.exports = run(main);




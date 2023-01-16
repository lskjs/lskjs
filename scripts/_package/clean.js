#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('rm -rf ./lib/* ./coverage ./package');
};

module.exports = run(main);

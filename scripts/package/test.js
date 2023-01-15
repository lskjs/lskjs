#!/usr/bin/env node
const { run, pathexec } = require('@lskjs/cli-utils');

const main = async () => {
  await pathexec('test:jest');
  await pathexec('test:eslint');
  await pathexec('test:size-limit');
};

module.exports = run(main);

#!/usr/bin/env node
const { isCI } = require('@lskjs/env');
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  const ciArgs = isCI ? '--hide-passed' : '';
  await shell(`size-limit ${ciArgs}`);
};

module.exports = run(main);

#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv, cwd = process.cwd() } = {}) => {
  await shell(
    `jest --watch --coverage --config ../../scripts/jest.config.json --rootDir ${cwd}`
  );
};

module.exports = run(main);

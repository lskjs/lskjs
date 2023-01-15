#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ argv, cwd } = {}) => {
  await shell(
    `jest --coverage --config ../../scripts/jest.config.json --rootDir ${cwd}`
  );
};

module.exports = run(main);

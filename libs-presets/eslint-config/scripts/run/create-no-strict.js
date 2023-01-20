#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('npx eslint --print-config strict/index.js > nostrict/raw.json');
};

module.exports = run(main);

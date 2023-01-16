#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const { run } = require('@lskjs/cli-utils');

const main = async ({ args = [] } = {}) => {
  const cwd = process.cwd();
  const package = require(`${cwd}/package.json`);
  // console.log('[cwd]', cwd);
  const packageName = package.name;
  args.forEach((arg) => {
    if (arg.startsWith('--')) {
      const key = arg.replace('--', '');
      console.log(packageName.padEnd(20), `[${key}]`, package[key]);
    }
  });
};

module.exports = run(main);

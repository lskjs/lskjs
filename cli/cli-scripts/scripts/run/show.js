#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const { run, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, args, log, cwd, ctx } = {}) => {
  if (isRoot) {
    const passArgs = args.filter((a) => a !== '--');
    await shellParallel(`lsk run show ${passArgs.join(' ')}`, { ctx });
  } else {
    const package = require(`${cwd}/package.json`);
    args.forEach((arg) => {
      if (arg.startsWith('--')) {
        const key = arg.replace('--', '');
        log.info(`[${key}]`, package[key]);
      }
    });
  }
};

module.exports = run(main);

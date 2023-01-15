#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ args } = {}) => {
  const passArgs = args.filter((a) => a !== '--');
  // console.log('args', args);
  await shell(`pnpm -r exec lsk run show ${passArgs.join(' ')}`);
};

module.exports = run(main);

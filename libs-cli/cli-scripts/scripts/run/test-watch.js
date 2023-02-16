#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ args, ctx } = {}) => {
  await shell('lsk run test --watch', { ctx, args });
};

module.exports = run(main);

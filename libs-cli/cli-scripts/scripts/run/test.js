#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ isRoot, ctx, args } = {}) => {
  if (isRoot) {
    await shell('pnpm -r run test --prod --silent', { ctx, args });
    return;
  }
  await shell('lsk run test:jest', { ctx, args });
  await shell('lsk run test:eslint', { ctx, args });
  await shell('lsk run test:size-limit', { ctx, args });
};

module.exports = run(main);

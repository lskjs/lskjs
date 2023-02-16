#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

async function main({ isRoot } = {}) {
  if (isRoot) {
    await shell(`pnpm -r run build`);
  } else {
    await shell('node lib');
  }
}

module.exports = run(main);

#!/usr/bin/env node
const Err = require('@lskjs/err');
const { shell, run, findBin, log, hasTsHere } = require('@lskjs/cli-utils');

const DIST = process.env.DIST || 'build';
async function main() {
  if (!hasTsHere()) {
    log.error('!hasTsHere –– TS not found');
    throw new Err('!hasTsHere');
  }
  await shell(`lsk run build:js`);
  // NOTE: Why? https://github.com/babel/babel/issues/9668#issuecomment-602221154
  await shell(`${findBin('tsc')} --project tsconfig.types.json --outDir ${DIST}`);
}

run(main);

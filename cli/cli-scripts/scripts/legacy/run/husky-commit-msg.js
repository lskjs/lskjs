#!/usr/bin/env node
const { run, shell, findBin, log } = require('@lskjs/cli-utils');

const main = async ({ argv = [] } = {}) => {
  const args = argv.join(' ');
  log.trace('husky-commit-msg', args);
  // npx --no commitlint --edit $1
  await shell(`${findBin('commitlint')} --edit ${args}`);
};

run(main);

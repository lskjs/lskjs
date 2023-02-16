#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  const argv = process.argv.slice(2);
  await shell(`${findBin('jest')} --passWithNoTests ${argv.join(' ')}`);
};

run(main);

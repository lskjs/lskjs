#!/usr/bin/env node
const { run, rsync, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await rsync(['package.json', 'package-lock.json', 'yarn.lock', 'README.md'], 'release', { ignoreMissingFiles: true });
  await shell(`npm publish release/`);
};

run(main);

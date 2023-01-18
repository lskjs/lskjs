#!/usr/bin/env node
const { run, rsync } = require('@lskjs/cli-utils');

const main = async () => {
  await rsync(['package.json', 'package-lock.json', 'yarn.lock', 'README.md'], 'release', { ignoreMissingFiles: true });
};

run(main);

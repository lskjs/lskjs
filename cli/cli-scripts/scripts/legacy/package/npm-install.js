#!/usr/bin/env node
const { shell, run, isDebug } = require('@lskjs/cli-utils');

const main = async () => {
  const npmInstallParams = isDebug() ? '' : '--no-fund --no-audit --loglevel=error';
  if (process.env.NODE_ENV === 'production') {
    await shell(`npm ci ${npmInstallParams}`);
  } else {
    await shell(`npm i ${npmInstallParams}`);
  }
};

run(main);

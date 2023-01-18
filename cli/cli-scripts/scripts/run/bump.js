#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const { run, shell } = require('@lskjs/cli-utils');
const { writeFile } = require('fs/promises');

const main = async ({ isRoot, cwd } = {}) => {
  if (isRoot) {
    await shell(`pnpm -r exec lsk run bump`);
    return;
  }
  const filename = `${cwd}/package.json`;
  const package = require(filename);
  await writeFile(
    filename,
    JSON.stringify(
      {
        ...package,
        '//': `${package['//'] || ''}/`,
      },
      null,
      2,
    ),
  );
  await shell('npx eslint --fix package.json');
};

module.exports = run(main);

#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const { run, shellParallel } = require('@lskjs/cli-utils');
const { writeFile } = require('fs/promises');

const main = async ({ isRoot, cwd, ctx, args }) => {
  if (isRoot) {
    await shellParallel(`lsk run bump`, { ctx, args });
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
};

module.exports = run(main);

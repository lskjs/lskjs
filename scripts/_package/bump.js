#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  const cwd = process.cwd();
  const filename = `${cwd}/package.json`;
  const package = require(filename);
  fs.writeFileSync(
    filename,
    JSON.stringify(
      {
        ...package,
        '//': `${package['//'] || ''}/`,
      },
      null,
      2
    )
  );
  await shell('npx eslint --fix package.json');
};

module.exports = run(main);

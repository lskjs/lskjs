#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  const cwd = process.cwd();
  const pack = cwd.split('/').reverse()[0];
  await shell(`PACKAGE=${pack} npm run storybook -- -p 9001 -c config`, {
    cwd: `${cwd}/../../.storybook`,
  });
};

run(main);

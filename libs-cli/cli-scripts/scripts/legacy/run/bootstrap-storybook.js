#!/usr/bin/env node
const { shell, run } = require('@lskjs/cli-utils');

const main = async () => {
  const cwd = `${process.cwd()}/.storybook`;

  await shell(`lsk run npm:install`, { cwd });
  await shell(`rm -f packages/node_module`);
  await shell(`ln -s ../packages/node_modules node_modules`, { cwd });
};

run(main);

#!/usr/bin/env node
const { parseArgs } = require('node:util');
// const { run, lernaParallel } = require('../../packages/cli-utils/src');
const { run } = require('../../packages/cli-utils/src');
const getList = require('@lerna/list');

const main = async (options) => {
  const { args } = options;
  const { values } = parseArgs({
    args,
    options: {
      silence: { type: 'boolean' },
      hello: { type: 'boolean' },
      world: { type: 'string' },
    },
  });
  const argv = {}
  const list = getList(argv);
  console.log({ list });
  console.log('[test5]: broadcast root', values);
  // await lernaParallel(`exec -- lsk run test5:broadcast-package`);
};

module.exports = run(main);

#!/usr/bin/env node
const { parseArgs } = require('node:util');
const { run } = require('../../packages/cli-utils/src');

const main = async (options) => {
  const { args } = options;
  const { values } = parseArgs({
    args,
    options: {
      hello: { type: 'boolean' },
      world: { type: 'string' },
    },
  });
  console.log('[test4]: runnable main', values);
};

module.exports = run(main);

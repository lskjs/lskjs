#!/usr/bin/env node
const { parseArgs } = require('node:util');

const main = async (options) => {
  const { args } = options;
  const { values } = parseArgs({
    args,
    options: {
      hello: { type: 'boolean' },
      world: { type: 'string' },
    },
  });

  console.log('[test3]: wrapped main object', values);
};

module.exports = { main };

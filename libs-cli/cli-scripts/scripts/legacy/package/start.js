#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`node index.server.js`);
};

run(main);

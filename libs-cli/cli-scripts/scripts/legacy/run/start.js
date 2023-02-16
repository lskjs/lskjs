#!/usr/bin/env node
const { run, lernaParallel } = require('@lskjs/cli-utils');

// @TODO: extract env file
const main = async () => {
  await lernaParallel(`exec --no-prefix -- npm run start`);
};

run(main);

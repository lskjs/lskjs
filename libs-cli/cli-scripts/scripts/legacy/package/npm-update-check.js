#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`${findBin('ncu')} -l error --dep=prod,dev,peer,optional`);
};

run(main);

#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  const commands = ['lsk run dev:server', 'lsk run dev:cra'];
  const cmd = commands.map((c) => `"${c}"`).join(' ');
  await shell(`${findBin('concurrently')} --handle-input -rki ${cmd} `);
};

run(main);

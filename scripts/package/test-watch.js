#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const joinCmds = (cmds = []) =>
  cmds
    .filter(Boolean)
    .map((a) => (a.includes(' ') ? `"${a}"` : a))
    .join(' ');

const main = async ({ args, cwd } = {}) => {
  // console.log({ args }, process.argv);
  if (!cwd) {
    console.log('!cwd');
    cwd = process.cwd();
  }
  const bareStart = args.indexOf('--');
  const bareArgs = bareStart >= 0 ? args.slice(bareStart + 1) : [];
  const bare = joinCmds(bareArgs);
  // console.log({ bareArgs, bare });
  const cmd = `jest --watch --coverage --config ../../scripts/jest.config.json --rootDir ${cwd} ${bare}`;
  // console.log({ cmd });
  await shell(cmd);
};

module.exports = run(main);

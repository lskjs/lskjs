#!/usr/bin/env node
const Bluebird = require('bluebird');
const { run, getLskConfig, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  const config = getLskConfig();
  const ncu = (config && config.ncu) || {};
  const target = ncu.target || 'latest';
  const params = [
    `--dep=${ncu.dep || 'prod,dev,peer,optional'}`,
    target ? `--target ${target}` : '',
    '--reject globby',
  ].join(' ');

  await Bluebird.each(
    ['.', 'packages/cli', 'packages/cli-scripts', 'packages/cli-utils', 'packages/cli-scripts/files'],
    async (path) => {
      const cwd = `${process.cwd()}/${path}`;
      try {
        await shell(`${findBin('ncu')} -u -l error -e 2  ${params}`, { cwd, fatal: 0, error: 0 });
      } catch (err) {
        if (err.code === 1) {
          await shell(`lsk run npm:install`, { cwd });
          return;
        }
        throw err;
      }
    },
  );
};

run(main);

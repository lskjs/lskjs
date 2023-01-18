#!/usr/bin/env node
const { run, getLskConfig, shell, findBin } = require('@lskjs/cli-utils');

// With --target minor, only update patch and minor:
// 0.1.0 → 0.2.1
// With --target patch, only update patch:
// 0.1.0 → 0.1.2
// --target newest
// default: "latest"

const main = async () => {
  const config = getLskConfig();
  const ncu = (config && config.ncu) || {};
  const packages = ncu.packages || '/^@(lskjs)/.*$/';
  const target = ncu.target || 'latest';
  try {
    const params = [`--dep=${ncu.dep || 'prod,dev,peer,optional'}`, target ? `--target ${target}` : ''].join(' ');
    await shell(`${findBin('ncu')} -u -l error -e 2 ${params} "${packages}"`, { fatal: 0, error: 0 });
  } catch (err) {
    if (err.code === 1) {
      await shell(`lsk run npm:install`);
      return;
    }
    throw err;
  }
};

run(main);

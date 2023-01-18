#!/usr/bin/env node
const { parseArgs } = require('node:util');
const { run, shell, pathexec } = require('../../packages/cli-utils/src');

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
  console.log('[test0]: global', values);

  // await shell('lsk run test1:plain-js');
  // await shell('lsk run test2:wrapped-main-fn');
  // await shell('lsk run test3:wrapped-main-object');
  // await shell('lsk run test4:runnable-main');
  // await shell('lsk run test4:runnable-main');

  await pathexec('test1:plain-js', values);
  await pathexec('test2:wrapped-main-fn', values);
  await pathexec('test3:wrapped-main-object', values);
  await pathexec('test4:runnable-main', values);
  await pathexec('test5:broadcast-root', values);
  // await pathexec('test4:runnable-main', { values });
};

module.exports = run(main);

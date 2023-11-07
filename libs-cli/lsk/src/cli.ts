#!/usr/bin/env node
/* eslint-disable no-console */
import { pathexec, run } from '@lskjs/cli-utils';
import yargs from 'yargs';

import { getLogo } from './utils/getLogo';
import { printInfo } from './utils/printInfo';

export default yargs(process.argv.slice(2))
  .scriptName('lsk')
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'info',
    aliases: ['i'],
    desc: 'Get info about current project',
    // builder: (yargs) => yargs.default('value', 'true'),
    handler: () => {
      const config = {
        name: require('../package.json').name,
        version: require('../package.json').version,
      };
      console.log(getLogo());
      printInfo({
        log: (...a) => console.log(...a),
        config,
      });
    },
  })
  .command({
    command: 'log',
    desc: 'Pretty logs ',
    handler: () => {
      require('@lskjs/log/cli');
    },
  })
  .command({
    command: 'run',
    desc: 'Run subcomand ',
    handler: async (argv) => {
      const [cmd, ...args] = process.argv.slice(3);
      await run(() => pathexec(cmd, { args, argv }));
    },
  })
  .demandCommand()
  .alias('h', 'help')
  .help('h').argv;

// res.argv;
// const { argv } =

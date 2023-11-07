#!/usr/bin/env node
/* eslint-disable no-console */
import yargs from 'yargs';

import { buildCommand, buildDeepCommand } from './commands/buildCommand';
import { uploadCommand } from './commands/uploadCommand';
import addCwd from './utils/addCwd';
import { getLogo } from './utils/getLogo';
import { printInfo } from './utils/printInfo';

export default yargs(process.argv.slice(2))
  .strict()
  .scriptName('lskcreds')
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
    command: 'build <dir> [--force] [--deep]',
    aliases: ['b'],
    desc: 'Build creds',
    handler: async (argv) => {
      const rawDir = argv.dir || '.';
      const dirname = addCwd(rawDir);
      if (argv.deep) {
        await buildDeepCommand(dirname, { force: argv.force });
      } else {
        await buildCommand(dirname, { force: argv.force });
      }
    },
  })
  .command({
    command: 'upload <dir> [--force] [--deep]',
    aliases: ['u'],
    desc: 'Upload creds',
    handler: async (argv) => {
      const rawDir = argv.dir || '.';
      const dirname = addCwd(rawDir);
      // if (argv.deep) {
      //   await buildDeepCommand(dirname, { force: argv.force });
      // } else {
      await uploadCommand(dirname, { force: argv.force });
      // }
    },
  })
  .command({
    command: 'build-upload <dir> [--force] [--deep]',
    aliases: ['bu'],
    desc: 'Build creds then upload',
    handler: async (argv) => {
      const rawDir = argv.dir || '.';
      const dirname = addCwd(rawDir);
      await buildCommand(dirname, { force: argv.force });
      await uploadCommand(dirname, { force: argv.force });
    },
  })
  .demandCommand()
  .alias('h', 'help')
  .help('h').argv;

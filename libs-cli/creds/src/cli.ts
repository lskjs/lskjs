#!/usr/bin/env node
/* eslint-disable no-console */
import { Err } from '@lskjs/err';
import { log } from '@lskjs/log/log';
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
    builder: {
      force: {
        type: 'boolean',
        default: false,
      },
      deep: {
        type: 'boolean',
        default: false,
      },
    },
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
    builder: {
      force: {
        type: 'boolean',
        default: false,
      },
      deep: {
        type: 'boolean',
        default: false,
      },
    },
    aliases: ['u'],
    desc: 'Upload creds',
    handler: async (argv) => {
      const rawDir = argv.dir || '.';
      const dirname = addCwd(rawDir);
      if (argv.deep) {
        throw new Err('Not implemented mass upload');
      } else {
        await uploadCommand(dirname, { force: argv.force });
      }
    },
  })
  .command({
    command: 'build-upload <dir> [--force] [--deep]',
    builder: {
      force: {
        type: 'boolean',
        default: false,
      },
      deep: {
        type: 'boolean',
        default: false,
      },
    },
    aliases: ['bu'],
    desc: 'Build creds then upload',
    handler: async (argv) => {
      const rawDir = argv.dir || '.';
      const dirname = addCwd(rawDir);
      if (argv.deep) {
        await buildDeepCommand(dirname, { force: argv.force });
        throw new Err('Not implemented mass upload');
      } else {
        await buildCommand(dirname, { force: argv.force });
        await uploadCommand(dirname, { force: argv.force });
      }
    },
  })
  .fail((msg, err) => {
    const errorMessage = msg || Err.getMessage(err);
    if (errorMessage) {
      log.fatal('');
      if (errorMessage) log.fatal(errorMessage);
      log.fatal('');
    }
    if (err) {
      log.error('');
      log.error(err);
      log.error('');
    }
    const isYargsError = !!msg; // && err.name === 'YError';
    if (isYargsError) {
      console.log('');
      String(yargs.showHelp());
      console.log('');
    }
    process.exit(1);
  })
  .demandCommand()
  .alias('h', 'help')
  .help('h').argv;

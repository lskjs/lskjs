#!/usr/bin/env node
/* eslint-disable max-len */
// import { program } from 'commander';
import yargs from 'yargs';

import { downloadAndSave } from './downloadAndSave';

yargs(process.argv)
  .command('getspreadsheet <url>', 'fetch the contents of the Google Spreadsheet')
  // .requiredOption('-u, --url <url>', 'url to the Google Spreadsheet document')
  .option('-o, --out <file>', 'path to json file with result')
  .option('-f, --format <csv|json|js|yaml|keyval|dotenv>', 'output format ', 'json')
  .option(
    '-t, --type <array|objects|object>',
    'type of data in spreadsheet.  array = raw array of string, objects = forst row is keys, object = first row is keys, second as values',
    'objects',
  )
  .option('-n, --nested', 'works with nested fields')
  .option('-m, --mapper', 'mapper function')
  .action(downloadAndSave)
  .parse(process.argv);

// .demandCommand(1)
//   .parse();

// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';

// yargs(process.argv)
//   .command(
//     'curl <url>',
//     'fetch the contents of the URL',
//     () => {},
//     (argv) => {
//       console.info(argv);
//     },
//   )
//   .demandCommand(1)
//   .parse();

#!/usr/bin/env node
import { program } from 'commander';

import { downloadAndSave } from './downloadAndSave';

program
  // .version(require('../package.json').version)
  .command('getspreadsheet <url>')
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

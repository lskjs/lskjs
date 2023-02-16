#!/usr/bin/env node
/* eslint-disable max-len */
import { program } from 'commander';

import { downloadAndSave } from './downloadAndSave';

program
  // .version(require('../package.json').version)
  .command('getspreadsheet <url>')
  // .requiredOption('-u, --url <url>', 'url to the Google Spreadsheet document')
  .option('-o, --out <file>', 'path to json file with result')
  .option('-f, --format <csv|json|jsonEachRow|js|yaml|keyval|dotenv>', 'output format ', 'json')
  .option(
    '-t, --type <array|objects|object>',
    'type of data in spreadsheet.  array = raw array of string, objects = forst row is keys, object = first row is keys, second as values',
    'objects',
  )
  .option('-n, --nested <fn>', 'works with nested fields')
  .option('-m, --mapper <fn>', 'mapper function')
  .action((url, { out, format, nested, type, mapper: mapperStr, filter: filterStr }) => {
    // eslint-disable-next-line no-eval
    const mapper: (a: any) => any | null = mapperStr ? eval(mapperStr) : undefined;
    // eslint-disable-next-line no-eval
    const filter: (a: any) => any | null = filterStr ? eval(filterStr) : undefined;
    if (mapper) mapper({});
    if (filter) filter({});
    // console.log(url, { out, format, nested, type, mapperStr, mapper, filterStr, filter });
    return downloadAndSave(url, { out, format, nested, type, mapper, filter });
  })
  .parse(process.argv);

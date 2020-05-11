import program from 'commander';
import parse from 'csv-parse';
import fs from 'fs';
import { promisify } from 'util';

import getSpreadsheet from '../getSpreadsheet';
// import Promise from 'bluebird';
const parseAsync = promisify(parse);

// export default async (spreadsheets, locales, destination) => {
//   const localesRows = [];
//   await Promise.all(
//     spreadsheets.map(async spreadsheet => {
//       const rows =
// ' https://docs.google.com/spreadsheets/d/1c9oYV4xIG32w7Y3Sh1V71zoQQBPhgxuXj2ea_tJU0RM',

program
  .version(require('../../package.json').version)
  .command('getspreadsheet <url>')
  // .requiredOption('-u, --url <url>', 'url to the Google Spreadsheet document')
  .option('-o, --out <file>', 'path to json file with result')
  .option(
    '-f, --format <array|object|raw>',
    'row format of the json data: every row is array of cells or object (first row is keys) or raw csv',
    'array',
  )
  .action((url, { out, format } = {}) => {
    if (url.indexOf('#') === -1) {
      url += '#gid=0';
    }
    if (!out) {
      out = `spreadsheet${format === 'raw' ? '.csv' : '.json'}`;
    }
    const filename = (out[0] !== '~' && out[0] !== '/' ? `${process.cwd()}/` : '') + out;
    // console.log('options', url, out, filename, format);
    getSpreadsheet(url)
      .then(async (csv) => {
        let str;
        if (format === 'csv') {
          str = csv;
        } else {
          const rawData = await parseAsync(csv, { columns: format === 'object' });
          str = JSON.stringify(rawData);
        }
        fs.writeFileSync(filename, str);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('getSpreadsheet err', err);
      });
  })
  .parse(process.argv);

// const cli = meow(`
//   Usage
//     $ build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

//   Options
//     --locales  One or multiple of needed locales, example: ru ru,en en
//     --link  One or multiple links, example: --link url1 --link url2
//     --dist  Destination folder

//   Examples
//     $ build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales
//     $ build-locales --locales en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales
// `);

// const start = async ({ locales, link, dist }) => {
//   if (!locales) {
//     throw new Error('locales not found');
//   }
//   if (!link) {
//     throw new Error('link not found');
//   }
//   if (!dist) {
//     throw new Error('destination not found');
//   }
//   const localesArray = locales.split(',');
//   const links = Array.isArray(link) ? link : [link];

//   console.log('try to getSpreadsheets', links);

//   console.log('getSpreadsheet done');
//   await buildLocales(spreadsheets, localesArray, dist);
//   console.log('Complete');
// };
// start(cli.flags);

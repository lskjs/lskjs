import getSpreadsheet from '@lskjs/getspreadsheet';
import meow from 'meow';
import buildLocales from '../build-locales';

const cli = meow(`
  Usage
    $ build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

  Options
    --locales  One or multiple of needed locales, example: ru ru,en en
    --link  One or multiple links, example: --link url1 --link url2
    --dist  Destination folder

  Examples
    $ build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales
    $ build-locales --locales en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales
`);

const start = async ({ locales, link, dist }) => {
  if (!locales) {
    throw new Error('locales not found');
  }
  if (!link) {
    throw new Error('link not found');
  }
  if (!dist) {
    throw new Error('destination not found');
  }
  const localesArray = locales.split(',');
  const links = Array.isArray(link) ? link : [link];

  const spreadsheets = await Promise.all(links.map(getSpreadsheet));
  await buildLocales(spreadsheets, localesArray, dist);
  console.log('Complete');
};
start(cli.flags);

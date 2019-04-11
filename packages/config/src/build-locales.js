import fs from 'fs';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import parse from 'csv-parse';
import { promisify } from 'util';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import { getKeyValJson } from './utils';
const parseAsync = promisify(parse);
const readFileAsync = promisify(fs.readFile);

// const blackListNs = ['events', 'adminTelegram', 'document'];
const locales = ['ru', 'en'];
const localesDirname = 'locales';
// const urls = [
//   'locales-raw/lsk.csv',
//   'locales-raw/buzzguru-ui.csv',
//   'locales-raw/buzzguru-analytics.csv',
// ];
const files = [
  'locales-raw/lsk.csv',
  'locales-raw/buzzguru.csv',
  // 'locales-raw/buzzguru-analytics.csv',
];

const localesRows = [];
Promise.all(files.map(async (file) => {
  const csvStr = await readFileAsync(file, 'utf8');
  const rows = await parseAsync(csvStr, { columns: true });
  localesRows.push(...rows);
})).then(() => {
  try {
    rimraf.sync(`${localesDirname}`);
    mkdirp.sync(`${localesDirname}`);
  } catch (err) {
    console.log(err);
  }
  locales.forEach((locale) => {
    const dirname = `${localesDirname}/${locale}`;
    try {
      mkdirp.sync(`${dirname}`);
    } catch (err) {
      console.log(err);
    }
    fs.writeFileSync(`${dirname}.json`, JSON.stringify(getKeyValJson(localesRows, locale), null, 2)); // eslint-disable-line max-len
    // fs.writeFileSync(`${dirname}/translation.json`, JSON.stringify(getKeyValJson(localesRows, locale), null, 2)); // eslint-disable-line max-len
    const namespaces = groupBy(localesRows, 'ns');
    forEach(namespaces, (rows, ns) => {
      if (!ns) return;
      fs.writeFileSync(`${dirname}/${ns}.json`, JSON.stringify(getKeyValJson(rows, locale), null, 2));
    });
  });
});

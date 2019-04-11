const fs = require('fs');
const groupBy = require('lodash/groupBy');
const forEach = require('lodash/forEach');
const parse = require('csv-parse')
const { promisify } = require('util');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { getKeyValJson, parseRawJson, parseTxt } = require('./utils');
const parseAsync = promisify(parse);

// const blackListNs = ['events', 'adminTelegram', 'document'];
const locales = ['ru', 'en'];
const rawDir = 'locales-raw'; // `${__dirname}/../public/locales`;
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

(async () => {
  const localesRows = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const csvStr = fs.readFileSync(file, 'utf8');
    // eslint-disable-next-line no-await-in-loop
    const rows = await parseAsync(csvStr, { columns: true });
    localesRows.push(...rows);
  }
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
})();
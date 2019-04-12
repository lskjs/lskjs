const fs = require('fs');
const groupBy = require('lodash/groupBy');
const forEach = require('lodash/forEach');
const { getKeyValJson, parseRawJson, parseTxt } = require('./utils');

// const blackListNs = ['events', 'adminTelegram', 'document'];
const locales = ['ru', 'en'];
const localesRows = parseTxt(
  fs
    .readFileSync(`${__dirname}/locales.txt`)
    .toString(),
);


try {
  fs.mkdirSync(`${__dirname}/../public/locales`);
} catch (err) {}

const localesDirname = `${__dirname}/../public/locales`;
try {
  fs.rmdirSync(`${localesDirname}/..`);
  fs.mkdirSync(`${localesDirname}/..`);
} catch (err) {}
locales.forEach((locale) => {
  const dirname = `${localesDirname}/${locale}`;
  try {
    fs.mkdirSync(`${dirname}/..`);
  } catch (err) {}
  try {
    fs.mkdirSync(`${dirname}`);
  } catch (err) {}
  fs.writeFileSync(`${dirname}.json`, JSON.stringify(getKeyValJson(localesRows, locale), null, 2)); // eslint-disable-line max-len
  fs.writeFileSync(`${dirname}/translation.json`, JSON.stringify(getKeyValJson(localesRows, locale), null, 2)); // eslint-disable-line max-len
  const namespaces = groupBy(localesRows, 'ns');
  forEach(namespaces, (rows, ns) => {
    if (!ns) return;
    fs.writeFileSync(`${dirname}/${ns}.json`, JSON.stringify(getKeyValJson(rows, locale), null, 2));
  });
});

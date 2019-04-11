/**
npx getspreasheet https://docs.google.com/uc?export=download&id=1v7yYDK-JRoA0pV9XW9OtAmiZozoMkdon > src/locales/locales.raw.csv
*/

1) 
LSLJS / utils
const { grid2objects } = require('jsongrid'); 
const { csv2grid } = require('jsongrid');



2) 
CSV => JSON ??? 
csv2grid(
  multiline(str || ''),
),
https://www.npmjs.com/package/csvtojson


3) 

npx getspreasheet lsk-locales > locales-raw/lsk.csv
npx getspreasheet buzzguru-ui-locales > locales-raw/buzzguru-ui.csv
npx getspreasheet buzzguru-analytics-locales > locales-raw/buzzguru-analytics.csv

const locales = ['ru', 'en', 'es'];
const rawDir = 'locales-raw'
const urls = [
locales-raw/lsk.csv
locales-raw/buzzguru-ui.csv
locales-raw/buzzguru-analytics.csv
]
const files = [
locales-raw/lsk.csv
locales-raw/buzzguru-ui.csv
locales-raw/buzzguru-analytics.csv
]

=> 




// 
ns category? name! ru en

foreach locales => locale
  const 
  let common = {}
  foreach files => file
    const grid = csvtojson(readFile(file));
    const json = grid2objects(grid);
    
    common merge()








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
    








const verifyJson = () => {}


JSON
grid2objects()


Изучить csvtogrid - api
перенести jsongrid в lskjs/utils


const locales = file('');
verifyJson(locales) => throw 

const { grid2objects } = require('jsongrid');
const { csv2grid } = require('jsongrid');





// const locales = ['ru', 'en', 'de', 'fr', 'es', 'id', 'pt', 'tr', 'pl'];

const localeRows = parsenata(
  fs
  // .readFileSync(`${__dirname}/locales.txt`)
    .readFileSync(`${__dirname}/locales.raw.json`)
    .toString(),
);
const countries = parse(
  fs
    .readFileSync(`${__dirname}/countries.txt`)
    .toString(),
);
const contentTypes = parse(
  fs
    .readFileSync(`${__dirname}/contentTypes.txt`)
    .toString(),
);
const games = parse(
  fs
    .readFileSync(`${__dirname}/games.txt`)
    .toString(),
);
const triggers = parse(
  fs
    .readFileSync(`${__dirname}/triggers.txt`)
    .toString(),
);
const trelloMembers = parse(
  fs
    .readFileSync(`${__dirname}/trelloMembers.txt`)
    .toString(),
);
const trelloLabels = parse(
  fs
    .readFileSync(`${__dirname}/trelloLabels.txt`)
    .toString(),
);


//
// const data = fs
//     .readFileSync(`${__dirname}/locales.txt`)
//     .toString()
//     .split('\n')
//     .filter(a => a)
//     .map(a => a.split('\t'));
// const locales = {};
//
//



const mergedLocaleRows = _.cloneDeep(localeRows);

countries
  .forEach((row) => {
    mergedLocaleRows.push({
      ns: 'country',
      _category: 'country',
      _id: row.code,
      ...row,
    });
  });
contentTypes
  .forEach((row) => {
    mergedLocaleRows.push({
      ns: 'contentTypes',
      _category: 'contentTypes',
      _id: row.id,
      ...row,
    });
  });
games
  .forEach((row) => {
    mergedLocaleRows.push({
      ns: 'games',
      _category: 'games',
      _id: row.id,
      ...row,
    });
  });

// console.log(mergedLocaleRows.slice(mergedLocaleRows.length - 50));


try {
  fs.mkdirSync(`${__dirname}/../public/locales`);
} catch (err) {}

locales.forEach((locale) => {
  fs.writeFileSync(`${__dirname}/${locale}.json`, JSON.stringify(getJson(mergedLocaleRows, locale), null, 2));
  const clientDirname = `${__dirname}/../public/locales/${locale}`;
  try {
    fs.mkdirSync(`${clientDirname}/..`);
  } catch (err) {}
  try {
    fs.mkdirSync(`${clientDirname}`);
  } catch (err) {}


  fs.writeFileSync(`${clientDirname}.json`, JSON.stringify(getJson(mergedLocaleRows.filter(row => !blackListNs.includes(row.ns)), locale), null, 2)); // eslint-disable-line max-len
  const namespaces = _.groupBy(mergedLocaleRows, 'ns');
  _.forEach(namespaces, (rows, ns) => {
    if (!ns) return;
    fs.writeFileSync(`${clientDirname}/${ns}.json`, JSON.stringify(getJson(rows, locale), null, 2));
  });
});

{
  const json = [];
  countries
    .forEach((country) => {
      json.push({
        code: country.code,
        cis: !!country.cis,
        eu: !!country.eu,
        vatRate: +country.vatRate || null,
        flag: country.flag || null,
        languages: (country.languages || '').split(',').map(a => a.trim()).filter(a => a),
        isNotReal: !!country.isNotReal,
        channelCountries: !!country.channelCountries,
      });
    });
  fs.writeFileSync(`${__dirname}/../config/countries.json`, JSON.stringify(json, null, 2));
}
{
  const json = [];
  contentTypes
    .forEach((contentType) => {
      json.push(contentType.id);
    });
  fs.writeFileSync(`${__dirname}/../config/contentTypes.json`, JSON.stringify(json, null, 2));
}
{
  const json = [];
  games
    .forEach((game) => {
      json.push({
        id: game.id,
        parents: (game.parents || '').split(',').map(a => a.trim()).filter(a => a) || [],
        istop: +game.istop || null,
        oldid: game.oldid || null,
      });
    });
  fs.writeFileSync(`${__dirname}/../config/games.json`, JSON.stringify(json, null, 2));
}
{
  const json = [];
  triggers
    .filter(e => e.type)
    .forEach((event) => {
      const obj = {};
      _.forEach(_.omit(event, ['comment']), (val, key) => {
        if (val) obj[key] = val;
      });
      json.push(obj);
    });
  fs.writeFileSync(`${__dirname}/../config/triggers.json`, JSON.stringify(json, null, 2));
}
{
  const json = [];
  trelloMembers
    .filter(e => e.idList)
    .forEach((member) => {
      const obj = {};
      _.forEach(member, (val, key) => {
        if (val) obj[key] = val;
      });
      json.push(obj);
    });
  fs.writeFileSync(`${__dirname}/../config/trelloMembers.json`, JSON.stringify(json, null, 2));
}
{
  const json = [];
  trelloLabels
    .filter(e => e.id)
    .forEach((member) => {
      const obj = {};
      _.forEach(member, (val, key) => {
        if (val) obj[key] = val;
      });
      json.push(obj);
    });
  fs.writeFileSync(`${__dirname}/../config/trelloLabels.json`, JSON.stringify(json, null, 2));
}
console.log('Done');
// localeRows
// .forEach((row) => {
//   console.log({row});
//   //
//   // head.forEach((lang, i) => {
//   //   if (i < 2) return;
//   //   if (row[0] && !row[1]) return;
//   //   const name = row.slice(0, 2).filter(a => a).join('.');
//   //   if (!name) return;
//   //   const path = [head[i], name].filter(a => a).join('.');
//   //   const value = row[i];
//   //   if (_.get(locales, path)) {
//   //     console.log('Translate key duplicate', path, '');
//   //   }
//   //   if (value) {
//   //     // console.log({ path, value });
//   //     _.set(locales, path, value);
//   //   } else {
//   //     _.set(locales, path, name);
//   //   }
//   // });
// });
//
// _.forEach(locales, (data, key) => {
//   fs.writeFileSync(`${__dirname}/${key}.json`, JSON.stringify(data, null, 2));
// });

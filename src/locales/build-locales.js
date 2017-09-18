//
// Translate keys spreadsheet example
// https://docs.google.com/spreadsheets/d/108k52ZnAa-bnUPrvhj7QMlkG8G5fzbdSuzokIksSq9w/edit?usp=sharing
//
const _ = require('lodash');
const fs = require('fs');
const data = fs
    .readFileSync(`${__dirname}/locales.txt`)
    .toString()
    .split('\n')
    .filter(a => a)
    .map(a => a.split('\t'));

const locales = {};

const head = data[0];

data.slice(1)
.forEach((row) => {
  head.forEach((lang, i) => {
    if (i < 2) return;
    if (row[0] && !row[1]) return;
    const name = row.slice(0, 2).filter(a => a).join('.');
    if (!name) return;
    const path = [head[i], name].filter(a => a).join('.');
    const value = row[i];
    if (_.get(locales, path)) {
      console.log('Translate key duplicate', path, '');
    }
    if (value) {
      // console.log({ path, value });
      _.set(locales, path, value);
    } else {
      _.set(locales, path, name);
    }
  });
});

_.forEach(locales, (content, key) => {
  fs.writeFileSync(`${__dirname}/${key}.json`, JSON.stringify(content, null, 2));
});

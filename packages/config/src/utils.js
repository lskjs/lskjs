const get = require('lodash/get');
const set = require('lodash/set');
const { grid2objects } = require('jsongrid');
const { csv2grid } = require('jsongrid');

function txtToArray(str) {
  let str2 = '';
  while (true) {
    str2 = str.replace(/([\t\n]".*)(\n[^º])(.*"[\t\n])/gi, '$1\\n$3');
    if (str2.length === str.length) break;
    str = str2;
  }
  return str;
}

function parseRawJson(str = '') {
  str = str.replace(/&#8232;/g, '');
  // console.log('str', str.slice(0, 100));
  const maybeJson = JSON.parse(str);
  // console.log('maybeJson', maybeJson.slice(0, 2));
  const objects = grid2objects(maybeJson);
  // console.log('objects', objects.slice(0, 2));
  return objects;
}

function parseTxt(str = '') {
  return grid2objects(
    csv2grid(
      txtToArray(str || ''),
    ),
  );
}

const getVal = (val) => {
  try {
    return (val || '').toString().replace(/\\n/g, '\n');
  } catch (err) {
    console.log('getVal err', err, val);
  }
};

const setVal = (json, key, val) => {
  if (!key) return;
  if (get(json, key)) {
    console.log('Translate key duplicate', key, '');
  }
  if (val) {
    set(json, key, getVal(val));
  }
  // else {
  //   _.set(json, key, key);
  // }
};
function getKeyValJson(rows, locale) {
  const json = {};

  rows
    .forEach((row) => {
      const key = [row._category, row._id].filter(a => a).join('.');
      const val = row[locale];
      setVal(json, key, val);
    });
  return json;
}

module.exports = {
  getKeyValJson,
  getVal,
  setVal,
  txtToArray,
  parseRawJson,
  parseTxt,
};

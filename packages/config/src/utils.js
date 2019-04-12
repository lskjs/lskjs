const get = require('lodash/get');
const set = require('lodash/set');

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
};

import setVal from './setVal';

export default (rows, locale) => {
  const json = {};

  rows
    .forEach((row) => {
      const key = [row._category, row._id].filter(a => a).join('.');
      const val = row[locale];
      setVal(json, key, val);
    });
  return json;
};

import forEach from 'lodash/forEach';

export const replaceSymbols = (str, oldSymbol, newSymbol = '') => {
  const re = new RegExp(oldSymbol, 'g');
  return str.replace(re, newSymbol);
};

export default (values) => {
  let newValues = {};

  forEach(values, (value, oldKey) => {
    if (oldKey.indexOf('@') !== -1) {
      const newKey = replaceSymbols(oldKey, '@', '.');
      newValues = {
        ...newValues,
        [newKey]: value,
      };
      return;
    }
    newValues[oldKey] = value;
  });
  return newValues;
};


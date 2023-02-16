import forEach from 'lodash/forEach';

const mapValuesKeys = (object, fn) => {
  const res = {};
  forEach(object, (value, key) => {
    const { key: newKey, value: newValue } = fn(value, key);
    if (newKey != null) res[newKey] = newValue;
  });
  return res;
};

export default mapValuesKeys;

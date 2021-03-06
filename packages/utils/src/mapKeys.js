import forEach from 'lodash/forEach';

const mapKeys = (object, fn) => {
  const res = {};
  forEach(object, (value, key) => {
    const newKey = fn(value, key);
    if (newKey != null) res[newKey] = value;
  });
  return res;
};

export default mapKeys;

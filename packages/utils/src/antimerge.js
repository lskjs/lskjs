/* eslint-disable no-restricted-syntax */
import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';

const antimerge = (a, b) => {
  if (!isObject(a)) return null;
  if (!isObject(b)) return null;
  const res = {};
  for (const k in a) {
    if (Object.prototype.hasOwnProperty.call(a, k)) {
      if (isEqual(a[k], b[k])) continue; // eslint-disable-line no-continue
      res[k] = a[k];
    }
  }
  const diff = differenceWith(Object.keys(b), Object.keys(a), isEqual);
  diff.forEach(d => {
    res[d] = undefined;
  });
  return res;
};

export default antimerge;

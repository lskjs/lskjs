/* eslint-disable no-restricted-syntax */
import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';

export default function antimergeDeep(a, b) {
  if (!isObject(a)) return null;
  if (!isObject(b)) return null;
  const res = {};
  for (const k in a) {
    if ({}.hasOwnProperty.call(a, k)) {
      if (!isEqual(a[k], b[k])) {
        if (isObject(a[k]) && isObject(b[k])) {
          res[k] = antimergeDeep(a[k], b[k]);
        } else {
          res[k] = a[k];
        }
      }
    }
  }
  const diff = differenceWith(Object.keys(b), Object.keys(a), isEqual);
  diff.forEach(d => {
    res[d] = undefined;
  });
  return res;
}

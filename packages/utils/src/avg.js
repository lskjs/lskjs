import set from 'lodash/set';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';

export default (object, key, val) => {
  let value;
  let count = 1;
  if (isObject(val)) {
    ({ value = 1, count = 1 } = val);
  } else if (isNumber(val)) {
    value = val;
  } else {
    value = 1;
  }
  const value2 = get(object, `${key}.value`, 0) + value;
  const count2 = get(object, `${key}.count`, 0) + count;

  const res = {
    value: value2,
    count: count2,
    avg: value2 / count2,
  };
  set(object, key, res);
  return res;
};

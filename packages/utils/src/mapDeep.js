import mapValues from 'lodash/mapValues';
import isCollection from './isCollection';

export default function mapDeep(value, reduce, keys = []) {
  let res;
  if (isCollection(value)) {
    res = mapValues(value, (v, k) => {
      const res2 = mapDeep(v, reduce, [...keys, k]);
      // console.log('mapValues/map', { keys, k, res2 });
      return res2;
    });
    // console.log('mapValues/reduce', { res, keys });
  } else {
    res = value;
  }
  return reduce(res, keys);
}

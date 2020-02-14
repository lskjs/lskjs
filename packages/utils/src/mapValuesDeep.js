import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';

const isCollection = value => isPlainObject(value) || isArray(value);
export default function mapValuesDeep(value, map, reduce, keys = []) {
  return reduce(
    isCollection(value) ? mapValues(value, (v, k) => mapValuesDeep(v, map, reduce, [...keys, k])) : map(value),
  );
}

// const isCollection = value => isPlainObject(value) || isArray(value);
// export default function mapDeep(value, reduce, keys = []) {
//   return reduce(
//     isCollection(value) ? mapValues(value, (v, k) => mapValuesDeep(v, map, reduce, [...keys, k])) : value,
//   );
// }

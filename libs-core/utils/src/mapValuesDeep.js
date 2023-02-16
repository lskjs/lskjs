import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';

const DEBUG = false;

const isCollection = (value) => isPlainObject(value) || isArray(value);
export default function mapValuesDeep(value, map, reduce = (a) => a, keys = []) {
  // eslint-disable-next-line no-console
  if (DEBUG) console.log(`[${keys.join('.')}]:`, 'value', value, isCollection(value) ? '[isCollection]' : '');
  let mapValue;
  if (isPlainObject(value)) {
    mapValue = mapValues(value, (v, k) => mapValuesDeep(v, map, reduce, [...keys, k]));
  } else if (isArray(value)) {
    mapValue = value.map((v, k) => mapValuesDeep(v, map, reduce, [...keys, k]));
  } else {
    mapValue = map(value);
  }
  const reduceValue = reduce(mapValue);
  // eslint-disable-next-line no-console
  if (DEBUG) console.log(`[${keys.join('.')}]:`, 'mapValue', mapValue, 'reduceValue', reduceValue);
  return reduceValue;
}

import Bluebird from 'bluebird';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

import asyncMapValues from './asyncMapValues';

const DEBUG = false;

const isCollection = (value) => isPlainObject(value) || isArray(value);
export default async function asyncMapValuesDeep(value, map, reduce = (a) => a, keys = []) {
  // eslint-disable-next-line no-console
  if (DEBUG) console.log(`[${keys.join('.')}]:`, 'value', value, isCollection(value) ? '[isCollection]' : '');
  let mapValue;
  if (isPlainObject(value)) {
    mapValue = await asyncMapValues(value, (v, k) => asyncMapValuesDeep(v, map, reduce, [...keys, k]));
  } else if (isArray(value)) {
    mapValue = await Bluebird.map(value, (v, k) => asyncMapValuesDeep(v, map, reduce, [...keys, k]));
  } else {
    mapValue = await map(value, keys[keys.length - 1], { keys });
  }
  const reduceValue = await reduce(mapValue);
  // eslint-disable-next-line no-console
  if (DEBUG) console.log(`[${keys.join('.')}]:`, 'mapValue', mapValue, 'reduceValue', reduceValue);
  return reduceValue;
}

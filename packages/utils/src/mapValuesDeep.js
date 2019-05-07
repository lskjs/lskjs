import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';

export default function mapValuesDeep(v, callback) {
  return isPlainObject(v)
    ? mapValues(v, c => mapValuesDeep(c, callback))
    : callback(v);
}

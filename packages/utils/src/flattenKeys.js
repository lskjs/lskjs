import flatten from 'lodash/flatten';
import map from 'lodash/map';

import isCollection from './isCollection';

export default function flattenKeys(object, keys = [], join = (a) => a.join('.')) {
  if (isCollection(object)) {
    return flatten(map(object, (val, key) => flattenKeys(val, [...keys, key], join)));
  }
  return join(keys);
}

import map from 'lodash/map';
import flatten from 'lodash/flatten';
import isCollection from './isCollection';

export default function flattenKeys(object, keys = [], join = (a) => a.join('.')) {
  if (isCollection(object)) {
    return flatten(
      map(object, (val, key) => {
        return flattenKeys(val, [...keys, key], join);
      }),
    );
  }
  return join(keys);
}

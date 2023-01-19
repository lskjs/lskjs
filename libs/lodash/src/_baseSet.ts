import { assignValue } from './_assignValue.js';
import { castPath } from './_castPath.js';
import { isIndex } from './_isIndex.js';
import { toKey } from './_toKey.js';
import { isObject } from './isObject.js';

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
export function baseSet(object, path, value, customizer?) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  let index = -1;
  const { length } = path;
  const lastIndex = length - 1;
  let nested = object;

  while (nested != null && ++index < length) {
    const key = toKey(path[index]);
    let newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      const objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

export default baseSet;

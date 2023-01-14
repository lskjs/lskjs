import { castPath } from './_castPath.js';
import { parent } from './_parent.js';
import { toKey } from './_toKey.js';
import { last } from './last.js';

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
export function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

export default baseUnset;

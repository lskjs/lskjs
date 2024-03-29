import { castPath } from './_castPath.js';
import { toKey } from './_toKey.js';

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
export function baseGet(object: any, path: string | string[]) {
  path = castPath(path, object);

  let index = 0;
  const { length } = path;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

export default baseGet;

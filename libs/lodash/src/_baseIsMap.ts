import { getTag } from './_getTag.js';
import { isObjectLike } from './isObjectLike.js';

/** `Object#toString` result references. */
const mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
export function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

export default baseIsMap;

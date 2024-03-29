import { baseGetTag } from './_baseGetTag.js';
import { isObjectLike } from './isObjectLike.js';

/** `Object#toString` result references. */
const argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
export function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

export default baseIsArguments;

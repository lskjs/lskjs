import { baseIsSet } from './_baseIsSet.js';
import { baseUnary } from './_baseUnary.js';
import { nodeUtil } from './_nodeUtil.js';

/* Node.js helper references. */
const nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
export const isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

export default isSet;

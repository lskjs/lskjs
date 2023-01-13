// https://github.com/lodash/lodash/blob/master/isFunction.js

import { isClass } from './isClass';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * isFunction(class Any{})
 * // => true
 *
 * isFunction(() => {})
 * // => true
 *
 * isFunction(async () => {})
 * // => true
 *
 * isFunction(function * Any() {})
 * // => true
 *
 * isFunction(Math.round)
 * // => true
 *
 * isFunction(/abc/)
 * // => false
 */

export const isFunction = (v: any): boolean => typeof v === 'function' && !isClass(v);

export default isFunction;

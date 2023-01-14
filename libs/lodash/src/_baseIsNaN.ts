/* eslint-disable no-self-compare */
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
export function baseIsNaN(value) {
  return value !== value;
}

export default baseIsNaN;

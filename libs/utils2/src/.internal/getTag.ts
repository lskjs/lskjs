// https://github.com/lodash/lodash/blob/master/.internal/getTag.js

const toString = Object.prototype.toString

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
export const getTag = (value: any): string  => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

export default getTag
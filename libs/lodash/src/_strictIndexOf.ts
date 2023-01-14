/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
export function strictIndexOf(array, value, fromIndex) {
  let index = fromIndex - 1;
  const { length } = array;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

export default strictIndexOf;

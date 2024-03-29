/** Used for built-in method references. */
const objectProto = Object.prototype;

/** Used to check objects for own properties. */
const { hasOwnProperty } = objectProto;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
export function initCloneArray(array) {
  const { length } = array;
  const result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

export default initCloneArray;

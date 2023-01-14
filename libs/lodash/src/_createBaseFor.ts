/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
export function createBaseFor(fromRight?) {
  return function (object, iteratee, keysFunc) {
    let index = -1;
    const iterable = Object(object);
    const props = keysFunc(object);
    let { length } = props;

    while (length--) {
      const key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

export default createBaseFor;

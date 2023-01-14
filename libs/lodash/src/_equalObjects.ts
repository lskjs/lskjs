import { getAllKeys } from './_getAllKeys.js';

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
const objectProto = Object.prototype;

/** Used to check objects for own properties. */
const { hasOwnProperty } = objectProto;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
export function equalObjects(
  object,
  other,
  bitmask,
  customizer,
  equalFunc,
  stack
) {
  const isPartial = Boolean(bitmask & COMPARE_PARTIAL_FLAG);
  const objProps = getAllKeys(object);
  const objLength = objProps.length;
  const othProps = getAllKeys(other);
  const othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  let index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  const objStacked = stack.get(object);
  const othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  let result = true;
  stack.set(object, other);
  stack.set(other, object);

  let skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    const objValue = object[key];
    const othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (
      !(compared === undefined
        ? objValue === othValue ||
          equalFunc(objValue, othValue, bitmask, customizer, stack)
        : compared)
    ) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    const objCtor = object.constructor;
    const othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (
      objCtor != othCtor &&
      'constructor' in object &&
      'constructor' in other &&
      !(
        typeof objCtor === 'function' &&
        objCtor instanceof objCtor &&
        typeof othCtor === 'function' &&
        othCtor instanceof othCtor
      )
    ) {
      result = false;
    }
  }
  stack.delete(object);
  stack.delete(other);
  return result;
}

export default equalObjects;

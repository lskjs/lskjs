import { arrayIncludes } from './_arrayIncludes.js';
import { arrayIncludesWith } from './_arrayIncludesWith.js';
import { cacheHas } from './_cacheHas.js';
import { createSet } from './_createSet.js';
import { SetCache } from './_SetCache.js';
import { setToArray } from './_setToArray.js';

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
export function baseUniq(array, iteratee?, comparator?) {
  let index = -1;
  let includes = arrayIncludes;
  const { length } = array;
  let isCommon = true;
  const result = [];
  let seen = result;

  if (comparator) {
    isCommon = false;
    // @ts-ignore
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    const set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }
  outer: while (++index < length) {
    let value = array[index];
    const computed = iteratee ? iteratee(value) : value;

    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      let seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
      // @ts-ignore
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

export default baseUniq;

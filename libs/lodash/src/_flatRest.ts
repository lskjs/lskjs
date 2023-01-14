import { overRest } from './_overRest.js';
import { setToString } from './_setToString.js';
import { flatten } from './flatten.js';

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
export function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), `${func}`);
}

export default flatRest;

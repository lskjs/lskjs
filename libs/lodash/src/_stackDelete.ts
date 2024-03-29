/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
export function stackDelete(key) {
  const data = this.__data__;
  const result = data.delete(key);

  this.size = data.size;
  return result;
}

export default stackDelete;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
export function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

export default listCacheClear;

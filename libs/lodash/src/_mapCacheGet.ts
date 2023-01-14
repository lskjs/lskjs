import { getMapData } from './_getMapData.js';

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
export function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

export default mapCacheGet;

// https://github.com/lodash/lodash/blob/master/fromPairs.js

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    export const  fromPairs = (pairs: Array<Array<any>>): Object =>  {
        let index = -1;
        let length = pairs == null ? 0 : pairs.length;
let            result = {};
        while (++index < length) {
          result[pairs[index][0]] = pairs[index][1];
        }
        return result;
      }
  
      export default  fromPairs
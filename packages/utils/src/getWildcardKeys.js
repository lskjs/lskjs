import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';

/**
 * Convert wildcard keys to simple keys of the rules
 * @param {object | [string]} rules - All rules
 * @param {[string] | string} keys - Input wildcard keys
 * @returns {[string]} Converted keys from wildcards matches
 */
export const getWildcardKeys = (rules, keys) => {
  if (keys === '*') return rules;
  const rx = /(.+\.)\*$/;
  const arr = typeof keys === 'string' ? [keys] : keys;
  const converted = arr.map((key) => {
    if (rx.test(key)) {
      const [, phrase] = key.match(rx);
      const rArr = Array.isArray(rules) ? rules : Object.keys(rules);
      return rArr.filter((name) => name.startsWith(phrase));
    }
    return key;
  });

  return uniq(flatten(converted));
};

export default getWildcardKeys;

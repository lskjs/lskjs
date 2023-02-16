import kebabCase from 'lodash/kebabCase';

import mapKeys from './mapKeys';

const kebabCaseKeys = (object, allowLeadUnderscore) =>
  mapKeys(object, (value, key) => (allowLeadUnderscore && key[0] === '_' ? `_${kebabCase(key)}` : kebabCase(key)));

export default kebabCaseKeys;

import lowerCase from 'lodash/lowerCase';
import mapKeys from './mapKeys';

const lowerCaseKeys = (object, allowLeadUnderscore) =>
  mapKeys(object, (value, key) => (allowLeadUnderscore && key[0] === '_' ? `_${lowerCase(key)}` : lowerCase(key)));

export default lowerCaseKeys;

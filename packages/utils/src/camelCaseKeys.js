import camelCase from 'lodash/camelCase';
import mapKeys from './mapKeys';

const camelCaseKeys = (object, allowLeadUnderscore) =>
  mapKeys(object, (value, key) => (allowLeadUnderscore && key[0] === '_' ? `_${camelCase(key)}` : camelCase(key)));

export default camelCaseKeys;

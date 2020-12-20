import snakeCase from 'lodash/snakeCase';
import mapKeys from './mapKeys';

const snakeCaseKeys = (object, allowLeadUnderscore) =>
  mapKeys(object, (value, key) => (allowLeadUnderscore && key[0] === '_' ? `_${snakeCase(key)}` : snakeCase(key)));

export default snakeCaseKeys;

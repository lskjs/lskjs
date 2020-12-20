import camelCase from 'lodash/camelCase';
import mapKeys from './mapKeys';

const camelCaseKeys = (object) => mapKeys(object, (value, key) => camelCase(key));

export default camelCaseKeys;

import lowerCase from 'lodash/lowerCase';
import mapKeys from './mapKeys';

const lowerCaseKeys = (object) => mapKeys(object, (value, key) => lowerCase(key));

export default lowerCaseKeys;

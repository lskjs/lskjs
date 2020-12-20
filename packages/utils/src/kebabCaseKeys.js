import kebabCase from 'lodash/kebabCase';
import mapKeys from './mapKeys';

const kebabCaseKeys = (object) => mapKeys(object, (value, key) => kebabCase(key));

export default kebabCaseKeys;

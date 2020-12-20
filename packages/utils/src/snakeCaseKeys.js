import snakeCase from 'lodash/snakeCase';
import mapKeys from './mapKeys';

const snakeCaseKeys = (object) => mapKeys(object, (value, key) => snakeCase(key));

export default snakeCaseKeys;

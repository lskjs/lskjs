import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';

export default value => isPlainObject(value) || isArray(value);

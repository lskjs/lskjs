import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

export default (value) => isPlainObject(value) || isArray(value);

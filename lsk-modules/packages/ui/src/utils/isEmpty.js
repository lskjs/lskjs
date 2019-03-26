
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

export default item => ((isArray(item) || isPlainObject(item)) ? isEmpty(item) : !item);


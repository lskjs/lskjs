import isFunction from 'lodash/isFunction';

export default v => isFunction(v);// && /^\s*class\s+/.test(v.toString());

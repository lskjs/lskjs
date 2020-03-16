// import isFunction from 'lodash/isFunction';

export default v => {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
};

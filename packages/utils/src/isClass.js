// import isFunction from 'lodash/isFunction';

export default (v) =>
  typeof v === 'function' && (v.toString().indexOf('_classCallCheck') !== -1 || /^\s*class\s+/.test(v.toString()));

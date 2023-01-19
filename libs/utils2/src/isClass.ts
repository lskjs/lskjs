export const isClass = (v: any): boolean =>
  typeof v === 'function' &&
  (v.toString().indexOf('_classCallCheck') !== -1 || /^\s*class\s+/.test(v.toString()));

export default isClass;

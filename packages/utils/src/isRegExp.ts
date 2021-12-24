const { toString } = Object.prototype;

export function isRegExp(value: RegExp): boolean {
  return toString.call(value) === '[object RegExp]';
}

export default isRegExp;

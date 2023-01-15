import { ObjectKeyPath } from './types';

export const set = <T>(object: T, keyPath: ObjectKeyPath, value: any): T => {
  const keys = Array.isArray(keyPath) ? keyPath : keyPath.split('.');
  const lastKey = keys.pop();
  const lastObj = keys.reduce((obj, key) => {
    // eslint-disable-next-line no-param-reassign
    if (obj[key] === undefined) obj[key] = {};
    return obj[key];
  }, object);
  lastObj[lastKey] = value;
  return object;
};

export default set;

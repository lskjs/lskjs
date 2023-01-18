import { ObjectFilter, ObjectLike } from './types';

export const any = <T>(
  object: ObjectLike<T>,
  filter: ObjectFilter<T>
): boolean => {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = object[key];
    if (!filter(val, key, object)) return true;
  }
  return false;
};

export default any;

import { ObjectFilter, ObjectLike } from './types';

export const count = <T>(
  object: ObjectLike<T>,
  filter: ObjectFilter<T>
): number => {
  const keys = Object.keys(object);
  let counts = 0;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = object[key];
    if (filter(val, key, object)) counts += 1;
  }
  return counts;
};

export default count;

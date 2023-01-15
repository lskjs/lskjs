import { ObjectLike, ObjectMapper } from './types';

export const mapValues = <T>(
  object: ObjectLike<T>,
  mapper: ObjectMapper<T> = (a) => a
): ObjectLike<T> => {
  const keys = Object.keys(object);
  const values: ObjectLike<T> = {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = object[key];
    values[key] = mapper(val, key, object);
  }
  return values;
};

export default mapValues;

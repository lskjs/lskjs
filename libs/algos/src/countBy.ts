import { ObjectLike, ObjectMapper } from './types';

export const countBy = <T>(
  object: ObjectLike<T>,
  mapper: ObjectMapper<T> = (a) => a
): ObjectLike<number> => {
  const keys = Object.keys(object);
  const counts = {} as ObjectLike<number>;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = object[key];
    const mapValue = mapper(val, key, object);
    counts[String(mapValue)] = (counts[String(mapValue)] || 0) + 1;
  }
  return counts;
};

export default countBy;

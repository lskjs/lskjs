import { ObjectFilter, ObjectLike } from './types';

export const pickBy = <T>(object: ObjectLike<T>, filter: ObjectFilter<T>) =>
  Object.keys(object)
    .filter((k) => filter(object[k], k, object))
    .reduce((acc, key) => {
      acc[key] = object[key];
      return acc;
    }, {} as Record<string, T>);

export default pickBy;

import { pickBy } from './pickBy';
import { ObjectFilter, ObjectLike } from './types';

export const omitBy = <T>(object: ObjectLike<T>, filter: ObjectFilter<T>) =>
  pickBy(object, (...args) => !filter(...args));

export default omitBy;

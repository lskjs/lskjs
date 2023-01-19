import { pickBy } from './pickBy';
import { ObjectFilter, ObjectLike } from './types';

const defaultFilter: ObjectFilter<any> = (a) => a != null;

export const omitNull = <T>(object: ObjectLike<T>, filter: ObjectFilter<T> = defaultFilter) =>
  pickBy(object, filter);

export default omitNull;

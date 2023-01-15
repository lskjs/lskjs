import mapValues from './mapValues';
import { ObjectLike, ObjectMapper } from './types';

export const map = <T>(
  object: ObjectLike<T>,
  mapper: ObjectMapper<T> = (a) => a
): Array<T> => Object.values(mapValues(object, mapper));

export default map;

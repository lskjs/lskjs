import { ObjectMapper } from './types';

export type Mapper<T> = (value?: T, key?: string, arr?: Array<T>) => any;


export const uniqBy = <T>(arr: Array<T>, mapper: ObjectMapper<T>): Array<T> =>
  // @ts-ignore
  [...new Set(arr.map(mapper))].map((x) => arr.find((y) => mapper(y) === x));

export default uniqBy;

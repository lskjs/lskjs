import { ObjectMapper } from './types';

export const maxBy = <T>(arr: Array<T>, filter: ObjectMapper<T>) =>
  arr.reduce((max, curr) => (filter(curr) > filter(max) ? curr : max), arr[0]);

export default maxBy;

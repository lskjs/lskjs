import { fromPairs } from '@lskjs/lodash';

export type IInput = any[];
export type IResult = { [name: string]: any };

export const arrayToObject = (array: IInput = []): IResult =>
  fromPairs(array.map((name) => [name, name]));

export default arrayToObject;

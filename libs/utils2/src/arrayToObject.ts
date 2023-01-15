const fromPairs = (array: IInput = []): IResult =>
  array.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

export type IInput = any[];
export type IResult = { [name: string]: any };

export const arrayToObject = (array: IInput = []): IResult =>
  fromPairs(array.map((name) => [name, name]));

export default arrayToObject;

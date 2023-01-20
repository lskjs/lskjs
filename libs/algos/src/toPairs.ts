export const toPairs = (object: Record<string, any>): [string, any][] =>
  Object.keys(object).map((key) => [key, object[key]]);

export default toPairs;

export const fromPairs = (array: [string, any][]): Record<string, any> =>
  array.reduce((acc: Record<string, any>, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

export default fromPairs;

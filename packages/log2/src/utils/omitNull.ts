
export const omitNull = (props: { [key: string]: any }) =>
  Object.keys(props)
    .filter((k) => props[k] != null)
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

const toString = (props: any, arg1: any = null, arg2 = 0) =>
  typeof props === 'object' ? stringify(props, arg1, arg2) : String(props);
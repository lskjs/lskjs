export const omitNull = (props: { [key: string]: any }) =>
  Object.keys(props)
    .filter((k) => props[k] != null)
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

export default omitNull;

export const omitNull = (props: { [key: string]: any }, filter = (a: any) => a != null) =>
  Object.keys(props)
    .filter((k) => filter(props[k]))
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

export default omitNull;

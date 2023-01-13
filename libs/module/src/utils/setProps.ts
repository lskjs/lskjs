import set from 'lodash/set';

export const setProps = (object: any, ...propsArray: Record<string, unknown>[]): Record<string, unknown> => {
  propsArray.forEach((props) => {
    Object.keys(props).forEach((key) => {
      set(object, key, props[key]);
    });
  });
  return object;
};

export default setProps;

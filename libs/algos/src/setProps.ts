import { set } from './set';

export const setProps = <T>(
  object: T,
  ...propsArray: Record<string, unknown>[]
): T => {
  propsArray.forEach((props) => {
    Object.keys(props).forEach((key) => {
      set(object, key, props[key]);
    });
  });
  return object;
};

export default setProps;

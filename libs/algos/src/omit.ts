import { PickOmit } from './types';

/**
 * NOTE: copied from @lskjs utils
 */

export const omit: PickOmit = (obj, keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: (typeof obj)[K];
  };
  let key: keyof typeof obj;
  // eslint-disable-next-line no-restricted-syntax
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

export default omit;

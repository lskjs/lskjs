/**
 * NOTE: copied from @lskjs utils
 */

interface Pick {
  <T extends Record<string, unknown>, K extends [...(keyof T)[]]>(obj: T, keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export const pick: Pick = (obj, keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: typeof obj[K];
  };
  let key: keyof typeof obj;
  // eslint-disable-next-line no-restricted-syntax
  for (key in obj) {
    if (keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

export default pick;

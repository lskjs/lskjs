/* global test expect */
import mapValuesKeys from '../src/mapValuesKeys';

test('mapValuesKeys', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
  const fn = (value, key) => ({
    key: key === 'a' ? undefined : key + key,
    value: value * value,
  });
  const res = {
    bb: 2 * 2,
    cc: 3 * 3,
    dd: 4 * 4,
  };

  expect(mapValuesKeys(obj, fn)).toStrictEqual(res);
});

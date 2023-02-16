/* global test expect */
import mapKeys from '../src/mapKeys';

test('mapKeys ', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
  const fn = (value, key) => (key === 'a' ? undefined : key + key);
  const res = {
    bb: 2,
    cc: 3,
    dd: 4,
  };

  expect(mapKeys(obj, fn)).toStrictEqual(res);
});

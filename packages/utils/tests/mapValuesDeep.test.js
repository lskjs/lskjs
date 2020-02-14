/* global test expect */
import filter from 'lodash/filter';
import mapValuesDeep from '../src/mapValuesDeep';

test('mapValuesDeep Boolean', () => {
  const obj = {
    a: {
      b: 1,
      c: {
        d: 2,
        e: false,
      },
    },
    f: 3,
  };
  const res = {
    a: {
      b: true,
      c: {
        d: true,
        e: false,
      },
    },
    f: true,
  };

  expect(mapValuesDeep(obj, Boolean)).toStrictEqual(res);
});
test('mapValuesDeep to array', () => {
  const obj = {
    a: {
      b: 1,
      c: {
        d: 2,
        e: false,
      },
    },
    f: 3,
  };
  const res = {
    a: {
      b: true,
      c: {
        d: true,
        e: false,
      },
    },
    f: true,
  };

  expect(mapValuesDeep(obj, Boolean, res2 => filter(res2, Boolean))).toStrictEqual(res);
});

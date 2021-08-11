/* global test expect */
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import pickBy from 'lodash/pickBy';

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

test('mapValuesDeep with filter', () => {
  const input = {
    a: {
      b: 1,
      c: {
        d: 2,
        e: false,
      },
    },
    f: 3,
    g: 0,
  };
  const output = {
    a: {
      b: 1,
      c: {
        d: 2,
      },
    },
    f: 3,
  };

  expect(
    mapValuesDeep(
      input,
      (a) => a,
      (res2) => (isPlainObject(res2) ? pickBy(res2, Boolean) : res2),
    ),
  ).toStrictEqual(output);
});

test('mapValuesDeep extract function', () => {
  const input = {
    a: 1,
    b: 2,
    extract: () => ({
      c: 3,
      d: 4,
    }),
  };
  const output = {
    a: 1,
    b: 2,
    extract: {
      c: 3,
      d: 4,
    },
  };

  expect(mapValuesDeep(input, (node) => (isFunction(node) ? node() : node))).toStrictEqual(output);
});

test('mapValuesDeep extract function deep', () => {
  const input = {
    a: 1,
    b: 2,
    extract: () => ({
      c: 3,
      d: 4,
      data: () => ({
        e: 5,
        f: 6,
      }),
    }),
  };
  const output = {
    a: 1,
    b: 2,
    extract: {
      c: 3,
      d: 4,
      data: {
        e: 5,
        f: 6,
      },
    },
  };

  function deepMap(item) {
    return isFunction(item) ? mapValuesDeep(item(), deepMap) : item;
  }

  expect(mapValuesDeep(input, deepMap)).toStrictEqual(output);
});

test('mapValuesDeep array function deep', () => {
  const input = [1, 2, () => [3, 4, () => [5, 6]], [7, 8]];
  const output = [1, 2, [3, 4, [5, 6]], [7, 8]];

  function deepMap(item) {
    return isFunction(item) ? mapValuesDeep(item(), deepMap) : item;
  }

  expect(mapValuesDeep(input, deepMap)).toStrictEqual(output);
});

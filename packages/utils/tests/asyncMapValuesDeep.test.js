/* global test expect */
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import pickBy from 'lodash/pickBy';

import asyncMapValuesDeep from '../src/asyncMapValuesDeep';

test('asyncMapValuesDeep Boolean', async () => {
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

  expect(await asyncMapValuesDeep(obj, Boolean)).toStrictEqual(res);
});

test('asyncMapValuesDeep with filter', async () => {
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
    await asyncMapValuesDeep(
      input,
      (a) => a,
      (res2) => (isPlainObject(res2) ? pickBy(res2, Boolean) : res2),
    ),
  ).toStrictEqual(output);
});

test('asyncMapValuesDeep extract function', async () => {
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

  expect(await asyncMapValuesDeep(input, (node) => (isFunction(node) ? node() : node))).toStrictEqual(output);
});

test('asyncMapValuesDeep extract function deep', async () => {
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

  async function deepMap(item) {
    return isFunction(item) ? asyncMapValuesDeep(item(), deepMap) : item;
  }

  expect(await asyncMapValuesDeep(input, deepMap)).toStrictEqual(output);
});

test('asyncMapValuesDeep key and context', async () => {
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
  const iterations = [
    {
      context: {
        keys: ['a', 'b'],
      },
      key: 'b',
      value: 1,
    },
    {
      context: {
        keys: ['a', 'c', 'd'],
      },
      key: 'd',
      value: 2,
    },
    {
      context: {
        keys: ['a', 'c', 'e'],
      },
      key: 'e',
      value: false,
    },
    {
      context: {
        keys: ['f'],
      },
      key: 'f',
      value: 3,
    },
  ];

  const realIterations = [];
  const realRes = await asyncMapValuesDeep(obj, (value, key, context) => {
    realIterations.push({
      value,
      key,
      context,
    });
    return Boolean(value);
  });

  expect(realRes).toStrictEqual(res);
  expect(realIterations).toStrictEqual(iterations);
});

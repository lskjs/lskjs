/* global describe it expect */
import antimerge from '../src/antimerge';

const testcases = [
  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    {
      a: 1,
      b: 2,
      d: 4,
    },
    {
      b: 3,
      c: 2,
      d: undefined,
    },
  ],
  [
    {
      a: 1,
      b: 3,
      c: 2,
      d: 4,
    },
    {
      a: 1,
      b: 2,
      d: 4,
    },
    {
      b: 3,
      c: 2,
    },
  ],

  [
    {
      a: 1,
      b: 3,
      c: 2,
      d: 4,
    },
    {
      a: 1,
      b: 2,
    },
    {
      b: 3,
      c: 2,
      d: 4,
    },
  ],

  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    {},
    {
      a: 1,
      b: 3,
      c: 2,
    },
  ],

  [{}, {}, {}],

  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    {
      a: 1,
      b: 3,
      c: 2,
    },
    {},
  ],

  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    null,
    null,
  ],

  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    undefined,
    null,
  ],

  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    NaN,
    null,
  ],

  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    'asdasd',
    null,
  ],

  [
    {
      a: 1,
      b: 3,
      c: 2,
    },
    123123,
    null,
  ],

  [
    null,
    {
      a: 1,
      b: 3,
      c: 2,
    },
    null,
  ],

  [
    undefined,
    {
      a: 1,
      b: 3,
      c: 2,
    },
    null,
  ],

  [
    NaN,
    {
      a: 1,
      b: 3,
      c: 2,
    },
    null,
  ],

  [
    'asdasd',
    {
      a: 1,
      b: 3,
      c: 2,
    },
    null,
  ],

  [
    123123,
    {
      a: 1,
      b: 3,
      c: 2,
    },
    null,
  ],

  [
    {},
    {
      a: 1,
      b: 3,
      c: 2,
    },
    {
      a: undefined,
      b: undefined,
      c: undefined,
    },
  ],

  [
    {
      a: 3,
    },
    {
      b: 5,
    },
    {
      a: 3,
      b: undefined,
    },
  ],

  [
    {
      a: 1,
      b: 3,
      c: 5,
    },
    {
      a: 1,
      b: 3,
      c: 2,
      d: 234,
    },
    {
      c: 5,
      d: undefined,
    },
  ],

  [
    {},
    {
      a: 1,
      b: 3,
      c: 2,
    },
    {
      a: undefined,
      b: undefined,
      c: undefined,
    },
  ],

  [
    {
      a: [1, 2, 3],
      b: [1, 3],
      c: 2,
    },
    {
      a: [1, 2, 3],
      b: [1, 2],
      c: undefined,
    },
    {
      b: [1, 3],
      c: 2,
    },
  ],

  [
    {
      a: [{ a: 2 }],
      b: [1, 3],
      c: 2,
    },
    {
      a: [{ a: 3 }],
      b: [1, 2],
      c: undefined,
    },
    {
      a: [{ a: 2 }],
      b: [1, 3],
      c: 2,
    },
  ],

  [
    {
      a: [{ a: 2 }],
      b: [1, 3],
      c: 2,
    },
    {
      a: [{ a: 2 }],
      b: [1, 2],
      c: undefined,
    },
    {
      b: [1, 3],
      c: 2,
    },
  ],

  [
    {
      a: [{}],
      b: [1, 3],
      c: 2,
    },
    {
      a: [{ a: 2 }],
      b: [1, 2],
      c: undefined,
    },
    {
      a: [{}],
      b: [1, 3],
      c: 2,
    },
  ],
];

describe('antimerge testes', () => {
  testcases.forEach((test) => {
    it(`should return ${JSON.stringify(test[2])}`, () => {
      expect(antimerge(test[0], test[1])).toEqual(test[2]);
    });
  });
});

/* global test expect describe */

import { isRegExp } from '../src/isRegExp';

const tests = [
  [
    'Value is ""',
    {
      value: '',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is undefined',
    {
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is null',
    {
      value: null,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is string',
    {
      value: 'lskjs',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is array',
    {
      value: ['lskjs', 'js'],
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is object',
    {
      value: {
        lskjs: 'lskjs',
        js: 'js',
      },
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is symbol',
    {
      value: Symbol('lskjs'),
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is date',
    {
      value: new Date(),
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is int',
    {
      value: 1,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is float',
    {
      value: 1.5,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is 0',
    {
      value: 0,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is less 0',
    {
      value: -1,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is bigint',
    {
      value: BigInt(9007199254740991),
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is function',
    {
      value: (v) => v,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is boolean',
    {
      value: true,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is Boolean',
    {
      value: Boolean,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Value is RegExp 1',
    {
      value: new RegExp('ab'),
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Value is RegExp 2',
    {
      value: new RegExp('ab', 'i'),
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Value is RegExp 3',
    {
      value: /ab/,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Value is RegExp 4',
    {
      value: /ab/i,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Value is RegExp function',
    {
      value: RegExp,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
];

describe('isRegExp', () => {
  test.each(tests)(
    '[isRegExp]: %s',
    // @ts-ignore
    async (label, { value, callback }) => {
      const response = isRegExp(value);
      callback(response);
    },
    10000,
  );
});

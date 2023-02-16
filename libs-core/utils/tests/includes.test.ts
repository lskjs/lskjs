/* global test expect describe */

import { includes } from '../src/includes';

const tests = [
  [
    'Number in collection numbers',
    {
      collection: [1, 2, 3],
      values: 1,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Number is not found in collection numbers',
    {
      collection: [1, 2, 3],
      values: 4,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'String in collection strings',
    {
      collection: ['1', '2', '3'],
      values: '1',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'String is not found in collection strings',
    {
      collection: ['1', '2', '3'],
      values: '4',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'String is not found in collection',
    {
      collection: [1, '2', '3'],
      values: '1',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Number is not found in collection 1',
    {
      collection: ['1', 2, 3],
      values: 1,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Number is not found in collection 2',
    {
      collection: ['1', '2', '3'],
      values: 4,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Number is not found in collection 3',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol(3), '2'],
      values: 3,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Number in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol('1'), '2', 3],
      values: 3,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Undefined in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol(3), '2', undefined],
      values: undefined,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Undefined is not found in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol(3), '2'],
      values: undefined,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Null in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol(3), '2'],
      values: null,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Null is not found in collection',
    {
      collection: ['1', { 1: 2 }, ['1', '2'], Symbol(3), '2'],
      values: null,
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Object in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol(3), '2'],
      values: { 1: 2 },
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Array of Objects in collection',
    {
      collection: ['1', null, { 1: 2 }, { 3: 4 }, ['1', '2'], Symbol(3), '2'],
      values: [{ 1: 2 }, { 3: 4 }],
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Object is not found in collection',
    {
      collection: ['1', null, ['1', '2'], Symbol(3), '2'],
      values: { 1: 2 },
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Array of Objects is not found in collection',
    {
      collection: ['1', null, ['1', '2'], Symbol(3), '2'],
      values: [{ 1: 2 }, { 3: 4 }],
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Strings is not found in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol(3)],
      values: ['1', '2'],
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Symbol is not found in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], Symbol(3), '2'],
      values: Symbol(3),
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Symbol is not found in collection',
    {
      collection: ['1', null, { 1: 2 }, ['1', '2'], '2'],
      values: Symbol(3),
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Stringify number in collection (by regExp)',
    {
      collection: ['2'],
      values: /\d/,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Number in collection (by regExp)',
    {
      collection: [1],
      values: /\d/,
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Array of number and string is not found in collection (by regExp)',
    {
      collection: [1, 'bs', 'lsk'],
      values: [/\d/, /ab/],
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Array of number and string in collection (by regExp)',
    {
      collection: [1, 'abs', 'lsk'],
      values: [/\d/, /lsk/],
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
];

describe('includes', () => {
  test.each(tests)(
    '[includes]: %s',
    // @ts-ignore
    async (label, { collection, values, callback }) => {
      const response = includes(collection, values);
      callback(response);
    },
    10000,
  );
});

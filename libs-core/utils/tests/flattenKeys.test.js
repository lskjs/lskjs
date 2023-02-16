/* global test expect */
// import filter from 'lodash/filter';
import flattenKeys from '../src/flattenKeys';

test('flattenKeys 1', () => {
  const obj = {
    a: 1,
    b: 2,
  };
  const res = ['a', 'b'];

  expect(flattenKeys(obj)).toStrictEqual(res);
});
test('flattenKeys 2', () => {
  const obj = {
    a: 1,
    b: {
      c: 1,
      d: 1,
    },
  };
  const res = ['a', 'b.c', 'b.d'];

  expect(flattenKeys(obj)).toStrictEqual(res);
});
test('flattenKeys 3', () => {
  const obj = {
    a: 1,
    b: {
      c: 1,
      d: 1,
    },
  };
  const res = ['a', 'b/c', 'b/d'];

  expect(flattenKeys(obj, [], (a) => a.join('/'))).toStrictEqual(res);
});
test('flattenKeys 4', () => {
  const obj = {
    a: 1,
    b: {
      c: 1,
      d: 1,
    },
  };
  const res = [['a'], ['b', 'c'], ['b', 'd']];

  expect(flattenKeys(obj, [], (a) => [a])).toStrictEqual(res);
});
// test('flattenKeys Boolean', () => {
//   const obj = {
//     a: {
//       b: 1,
//       c: {
//         d: 2,
//         e: false,
//       },
//     },
//     f: 3,
//   };
//   const res = {
//     a: {
//       b: true,
//       c: {
//         d: true,
//         e: false,
//       },
//     },
//     f: true,
//   };

//   expect(flattenKeys(obj)).toStrictEqual(res);
// });

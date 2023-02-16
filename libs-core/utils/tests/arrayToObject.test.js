/* global test expect */
import arrayToObject from '../src/arrayToObject';

test('arrayToObject(["a", "b"])', () => {
  const input = ['a', 'b'];
  const res = {
    a: 'a',
    b: 'b',
  };
  expect(arrayToObject(input)).toStrictEqual(res);
});
test('arrayToObject([])', () => {
  const input = [];
  const res = {};
  expect(arrayToObject(input)).toStrictEqual(res);
});
test('arrayToObject(undefined)', () => {
  const input = undefined;
  const res = {};
  expect(arrayToObject(input)).toStrictEqual(res);
});

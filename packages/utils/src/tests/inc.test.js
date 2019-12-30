/* global test expect */
import get from 'lodash/get';
import inc from '../inc';

test('check 0', () => {
  const obj = {};
  inc(obj, 'a');
  expect(get(obj, 'a')).toBe(1);
});
test('check 1', () => {
  const obj = { a: 1 };
  inc(obj, 'a');
  expect(get(obj, 'a')).toBe(2);
});

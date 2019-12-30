/* global test expect */
import get from 'lodash/get';
import avg from '../avg';

test('check 0', () => {
  const obj = {};
  avg(obj, 'a', 1);
  expect(get(obj, 'a.avg')).toBe(1);
  avg(obj, 'a', 3);
  expect(get(obj, 'a.avg')).toBe(2);
});

test('check 2', () => {
  const obj = {};
  avg(obj, 'a', { value: 1, count: 1 });
  expect(get(obj, 'a.avg')).toBe(1);
  avg(obj, 'a', { value: 3, count: 1 });
  expect(get(obj, 'a.avg')).toBe(2);
});

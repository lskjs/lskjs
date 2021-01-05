/* global test expect */
import get from 'lodash/get';
import getPagination, { getPages } from '../utils/getPagination';

test('getPages({ page: 5, max: 10, size: 5 })', () => {
  const layout = getPages({ page: 5, max: 10, size: 5 });
  expect(layout).toStrictEqual([1, 4, 5, 6, 10]);
});
test('getPages({ page: 2, max: 3, size: 5 })', () => {
  const layout = getPages({ page: 2, max: 3, size: 5 });
  expect(layout).toStrictEqual([1, 2, 3]);
});
test('getPages({ page: 1, max: 1, size: 5 })', () => {
  const layout = getPages({ page: 1, max: 1, size: 5 });
  expect(layout).toStrictEqual([1]);
});
test('getPages({ page: 1, max: 10, size: 5 })', () => {
  const layout = getPages({ page: 1, max: 10, size: 5 });
  expect(layout).toStrictEqual([1, 2, 3, 4, 10]);
});
test('getPages({ page: 10, max: 10, size: 5 })', () => {
  const layout = getPages({ page: 10, max: 10, size: 5 });
  expect(layout).toStrictEqual([1, 7, 8, 9, 10]);
});
test('getPagination({ page: 5, max: 10, size: 5 })', () => {
  const layout = getPagination({ page: 5, max: 10, size: 5 });
  expect(layout).toStrictEqual([
    {
      text: '« 1',
      page: 1,
    },
    {
      text: '4',
      page: 4,
    },
    {
      text: '- 5 -',
      page: 5,
    },
    {
      text: '6',
      page: 6,
    },
    {
      text: '10 »',
      page: 10,
    },
  ]);
});
test('getPagination({ page: 9, max: 10, size: 5 })', () => {
  const layout = getPagination({ page: 9, max: 10, size: 5 });
  expect(layout).toStrictEqual([
    {
      text: '« 1',
      page: 1,
    },
    {
      text: '7',
      page: 7,
    },
    {
      text: '8',
      page: 8,
    },
    {
      text: '- 9 -',
      page: 9,
    },
    {
      text: '10 »',
      page: 10,
    },
  ]);
});
test('getPagination({ page: 1, max: 1, size: 5 })', () => {
  const layout = getPagination({ page: 1, max: 1, size: 5 });
  expect(layout).toStrictEqual([]);
});

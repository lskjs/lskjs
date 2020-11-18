/* global test expect */
import flatten from 'lodash/flatten';
import chunkBy from '../src/chunkBy2';

test('check 0', () => {
  const res = [
    [
      {
        _id: 1,
      },
      {
        _id: 2,
      },
      {
        _id: 3,
      },
    ],
    [
      {
        _id: 2,
      },
      {
        _id: 3,
      },
    ],
    [
      {
        _id: 3,
      },
    ],
  ];
  const array = flatten(res);
  expect(chunkBy(array, a => a._id)).toStrictEqual(res);
});
test('check 1', () => {
  const res = [
    [
      {
        _id: 1,
      },
      {
        _id: 2,
      },
      {
        _id: 3,
      },
    ],
    [
      {
        _id: 2,
      },
      {
        _id: 3,
      },
    ],
    [
      {
        _id: 3,
      },
    ],
  ];
  const array = flatten(res);
  expect(chunkBy(array, '_id')).toStrictEqual(res);
});

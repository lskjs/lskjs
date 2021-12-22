/* global test expect describe */

import { getPathById } from '../src/getPathById';

const tests = [
  [
    'Without args',
    {
      callback: (response) => {
        expect(response.error.message).toBe('Empty string');
      },
    },
  ],
  [
    'Name is ""',
    {
      name: '',
      callback: (response) => {
        expect(response.error.message).toBe('Empty string');
      },
    },
  ],
  [
    'Deep is 0',
    {
      name: '1234567890',
      depth: 0,
      callback: (response) => {
        expect(response.error.message).toBe('Deep is not valid');
      },
    },
  ],
  [
    'Deep less 0',
    {
      name: '1234567890',
      depth: -1,
      callback: (response) => {
        expect(response.error.message).toBe('Deep is not valid');
      },
    },
  ],
  [
    'Length is 0',
    {
      name: '1234567890',
      length: 0,
      callback: (response) => {
        expect(response.error.message).toBe('Length is not valid');
      },
    },
  ],
  [
    'Length less 0',
    {
      name: '1234567890',
      length: -1,
      callback: (response) => {
        expect(response.error.message).toBe('Length is not valid');
      },
    },
  ],
  [
    'Simple id with default args',
    {
      name: '1234567890',
      callback: (response) => {
        expect(response).toBe('123/456/789/1234567890');
      },
    },
  ],
  [
    'Simple id 1',
    {
      name: '1234567890',
      depth: 5, // default
      length: 3, // default
      callback: (response) => {
        expect(response).toBe('123/456/789/1234567890');
      },
    },
  ],
  [
    'Simple id 2',
    {
      name: '1234567890',
      depth: 2,
      length: 5,
      callback: (response) => {
        expect(response).toBe('12345/67890/1234567890');
      },
    },
  ],
  [
    'Simple id 3',
    {
      name: '1234567890',
      depth: 7,
      length: 1,
      callback: (response) => {
        expect(response).toBe('1/2/3/4/5/6/7/1234567890');
      },
    },
  ],
  [
    'Simple id 4',
    {
      name: '1234567890123123123',
      depth: 3,
      length: 3,
      callback: (response) => {
        expect(response).toBe('123/456/789/1234567890123123123');
      },
    },
  ],
  [
    'Simple id 5',
    {
      name: '1234567890123123123',
      depth: 5,
      length: 3,
      callback: (response) => {
        expect(response).toBe('123/456/789/012/312/1234567890123123123');
      },
    },
  ],
  [
    'Simple id 6',
    {
      name: '123',
      depth: 1,
      length: 5,
      callback: (response) => {
        expect(response).toBe('123');
      },
    },
  ],
  [
    'MongoId 1',
    {
      name: '507f191e810c19729de860ea',
      depth: 5,
      length: 3,
      callback: (response) => {
        expect(response).toBe('507/f19/1e8/10c/197/507f191e810c19729de860ea');
      },
    },
  ],
  [
    'MongoId 2',
    {
      name: '507f191e810c19729de860ea',
      depth: 3,
      length: 2,
      callback: (response) => {
        expect(response).toBe('50/7f/19/507f191e810c19729de860ea');
      },
    },
  ],
  [
    'MongoId 3',
    {
      name: '507f191e810c19729de860ea',
      depth: 1,
      length: 24,
      callback: (response) => {
        expect(response).toBe('507f191e810c19729de860ea/507f191e810c19729de860ea');
      },
    },
  ],
  [
    'MongoId 4',
    {
      name: '507f191e810c19729de860ea',
      depth: 2,
      length: 24,
      callback: (response) => {
        expect(response).toBe('507f191e810c19729de860ea/507f191e810c19729de860ea');
      },
    },
  ],
  [
    'MongoId 5',
    {
      name: '507f191e810c19729de860ea',
      depth: 2,
      length: 12,
      callback: (response) => {
        expect(response).toBe('507f191e810c/19729de860ea/507f191e810c19729de860ea');
      },
    },
  ],
  [
    'MongoId 6',
    {
      name: '507f191e810c19729de860ea',
      depth: 3,
      length: 12,
      callback: (response) => {
        expect(response).toBe('507f191e810c/19729de860ea/507f191e810c19729de860ea');
      },
    },
  ],
  [
    'MongoId 7',
    {
      name: '507f191e810c19729de860ea',
      depth: 2,
      length: 13,
      callback: (response) => {
        expect(response).toBe('507f191e810c1/507f191e810c19729de860ea');
      },
    },
  ],
  [
    'MongoId 8',
    {
      name: '507f191e810c19729de860ea',
      depth: 1,
      length: 30,
      callback: (response) => {
        expect(response).toBe('507f191e810c19729de860ea');
      },
    },
  ],
];

describe('getPathById', () => {
  test.each(tests)(
    '[getPathById]: %s',
    async (label, { name, depth, length, callback }) => {
      try {
        const response = getPathById(name, depth, length);
        callback(response);
      } catch (e) {
        callback({ error: e });
      }
    },
    10000,
  );
});

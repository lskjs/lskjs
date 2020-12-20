/* global test expect */
import lowerCaseKeys from '../src/lowerCaseKeys';

test('lowerCaseKeys ', () => {
  const obj = {
    _id: 0,
    hello_world: 1,
    'hi-there': 2,
    goodNewsEveryone: 3,
  };
  const res = {
    _id: 0,
    'hello world': 1,
    'hi there': 2,
    'good news everyone': 3,
  };

  expect(lowerCaseKeys(obj, true)).toStrictEqual(res);
});

/* global test expect */
import camelCaseKeys from '../src/camelCaseKeys';

test('camelCaseKeys ', () => {
  const obj = {
    _id: 0,
    hello_world: 1,
    'hi-there': 2,
    goodNewsEveryone: 3,
  };
  const res = {
    _id: 0,
    helloWorld: 1,
    hiThere: 2,
    goodNewsEveryone: 3,
  };

  expect(camelCaseKeys(obj, true)).toStrictEqual(res);
});

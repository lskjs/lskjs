/* global test expect */
import camelCaseKeys from '../src/camelCaseKeys';

test('camelCaseKeys.test ', () => {
  const obj = {
    hello_world: 1,
    'hi-there': 2,
    goodNewsEveryone: 3,
  };
  const res = {
    helloWorld: 1,
    hiThere: 2,
    goodNewsEveryone: 3,
  };

  expect(camelCaseKeys(obj)).toStrictEqual(res);
});

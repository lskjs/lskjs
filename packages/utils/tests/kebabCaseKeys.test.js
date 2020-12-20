/* global test expect */
import kebabCaseKeys from '../src/kebabCaseKeys';

test('kebabCaseKeys.test ', () => {
  const obj = {
    hello_world: 1,
    'hi-there': 2,
    goodNewsEveryone: 3,
  };
  const res = {
    'hello-world': 1,
    'hi-there': 2,
    'good-news-everyone': 3,
  };

  expect(kebabCaseKeys(obj)).toStrictEqual(res);
});

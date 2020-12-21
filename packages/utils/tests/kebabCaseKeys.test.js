/* global test expect */
import kebabCaseKeys from '../src/kebabCaseKeys';

test('kebabCaseKeys ', () => {
  const obj = {
    _id: 0,
    hello_world: 1,
    'hi-there': 2,
    goodNewsEveryone: 3,
  };
  const res = {
    _id: 0,
    'hello-world': 1,
    'hi-there': 2,
    'good-news-everyone': 3,
  };

  expect(kebabCaseKeys(obj, true)).toStrictEqual(res);
});

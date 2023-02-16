/* global test expect */
import snakeCaseKeys from '../src/snakeCaseKeys';

test('snakeCaseKeys ', () => {
  const obj = {
    _id: 0,
    hello_world: 1,
    'hi-there': 2,
    goodNewsEveryone: 3,
  };
  const res = {
    _id: 0,
    hello_world: 1,
    hi_there: 2,
    good_news_everyone: 3,
  };

  expect(snakeCaseKeys(obj, true)).toStrictEqual(res);
});

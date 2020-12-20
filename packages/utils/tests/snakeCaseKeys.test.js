/* global test expect */
import snakeCaseKeys from '../src/snakeCaseKeys';

test('snakeCaseKeys ', () => {
  const obj = {
    hello_world: 1,
    'hi-there': 2,
    goodNewsEveryone: 3,
  };
  const res = {
    hello_world: 1,
    hi_there: 2,
    good_news_everyone: 3,
  };

  expect(snakeCaseKeys(obj)).toStrictEqual(res);
});

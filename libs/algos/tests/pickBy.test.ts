/* eslint-disable prefer-promise-reject-errors */
import { pickBy } from '../src';

describe('pickBy', () => {
  it('should work with a predicate argument', () => {
    const input = { one: 1, two: 2, three: 3, four: 4 };
    const results = pickBy(input, (n) => n === 2 || n === 4);
    expect(results).toEqual({ two: 2, four: 4 });
  });
});

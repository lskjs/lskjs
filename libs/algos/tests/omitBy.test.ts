/* eslint-disable prefer-promise-reject-errors */
import { omitBy } from '../src';

describe('omitBy', () => {
  it('should work with a predicate argument', () => {
    const input = { one: 1, two: 2, three: 3, four: 4 };
    const results = omitBy(input, (n) => n === 2 || n === 4);
    expect(results).toEqual({ one: 1, three: 3 });
  });
});

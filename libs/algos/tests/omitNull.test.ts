/* eslint-disable prefer-promise-reject-errors */
import { omitNull } from '../src';

describe('omitNull', () => {
  it('should work with a predicate argument', () => {
    const input = { one: 1, two: null, three: 3, four: undefined };
    const results = omitNull(input);
    expect(results).toEqual({ one: 1, three: 3 });
  });
});

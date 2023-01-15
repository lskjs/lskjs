/* eslint-disable prefer-promise-reject-errors */
import { omit } from '../src';

describe('omit', () => {
  it('should work with a predicate argument', () => {
    const input = { one: 1, two: 2, three: 3, four: 4 };
    const results = omit(input, ['two', 'four']);
    expect(results).toEqual({ one: 1, three: 3 });
  });
});

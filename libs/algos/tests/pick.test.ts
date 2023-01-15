/* eslint-disable prefer-promise-reject-errors */
import { pick } from '../src';

describe('pick', () => {
  it('should work with a predicate argument', () => {
    const input = { one: 1, two: 2, three: 3, four: 4 };
    const results = pick(input, ['two', 'four']);
    expect(results).toEqual({ two: 2, four: 4 });
  });
});

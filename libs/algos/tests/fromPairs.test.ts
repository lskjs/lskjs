/* eslint-disable prefer-promise-reject-errors */
import { fromPairs } from '../src';

describe('fromPairs', () => {
  it('check values', () => {
    const input = [
      ['one', 1],
      ['two', 2],
      ['three', 3],
    ];
    const results = fromPairs(input);
    expect(results).toEqual({ one: 1, two: 2, three: 3 });
  });
});

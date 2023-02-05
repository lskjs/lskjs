/* eslint-disable prefer-promise-reject-errors */
import { toPairs } from '../src';

describe('toPairs', () => {
  it('check values', () => {
    const input = { one: 1, two: 2, three: 3 };
    const results = toPairs(input);
    expect(results).toEqual([
      ['one', 1],
      ['two', 2],
      ['three', 3],
    ]);
  });
});

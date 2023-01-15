/* eslint-disable prefer-promise-reject-errors */
import { count } from '../src';

describe('count', () => {
  it('check values', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = count(input, (a) => a > 3);
    expect(results).toEqual(2);
  });
  it('check keys', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = count(input, (_, b) => b?.length === 3);
    expect(results).toEqual(2);
  });
});

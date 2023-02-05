/* eslint-disable prefer-promise-reject-errors */
import { any } from '../src';

describe('any', () => {
  it('check value', () => {
    const input = { one: 1, two: 2, three: 3};
    const results = any(input, (a) => a === 3);
    expect(results).toEqual(true);
  });
  it('check false value', () => {
    const input = { one: 1, two: 2, three: 3};
    const results = any(input, (a) => a === 44);
    expect(results).toEqual(false);
  });
});

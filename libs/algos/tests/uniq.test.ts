/* eslint-disable prefer-promise-reject-errors */
import { uniq } from '../src';

describe('uniq', () => {
  it('empty', () => {
    const input: Array<number> = [];
    const results = uniq(input);
    expect(results).toEqual([]);
  });
  it('1,2,3', () => {
    const input = [1,2,3,1,2];
    const results = uniq(input);
    expect(results).toEqual([1,2,3]);
  });
});

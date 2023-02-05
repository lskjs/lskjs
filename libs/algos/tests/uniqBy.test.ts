/* eslint-disable prefer-promise-reject-errors */
import { uniqBy } from '../src';

describe('uniqBy', () => {
  it('empty', () => {
    const input: Array<Record<string, number>> = [];
    const results = uniqBy(input, a => a.value);
    expect(results).toEqual([]);
  });
  it('1,2,3', () => {
    const input = [{value: 1},{value: 2},{value: 3},{value: 1},{value: 2}];
    const results = uniqBy(input, a => a.value);
    expect(results).toEqual([{value: 1},{value: 2},{value: 3}]);
  });
});

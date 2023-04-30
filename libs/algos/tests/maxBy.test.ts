/* eslint-disable prefer-promise-reject-errors */
import { maxBy } from '../src';

describe('maxBy', () => {
  it('empty', () => {
    const input: Array<Record<string, number>> = [];
    const results = maxBy(input, (a) => a.value);
    expect(results).toEqual(undefined);
  });
  it('1,2,3', () => {
    const input = [
      { i: 1, value: 1 },
      { i: 2, value: 2 },
      { i: 3, value: 3 },
      { i: 4, value: 1 },
      { i: 5, value: 2 },
      { i: 6, value: 3 },
    ];
    const results = maxBy(input, (a) => a.value);
    expect(results).toEqual({ i: 3, value: 3 });
  });
});

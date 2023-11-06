/* eslint-disable prefer-promise-reject-errors */
import { minBy } from '../src';

describe('minBy', () => {
  it('empty', () => {
    const input: Array<Record<string, number>> = [];
    const results = minBy(input, (a) => a.value);
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
    const results = minBy(input, (a) => a.value);
    expect(results).toEqual({ i: 1, value: 1 });
  });
  it('3,2,1', () => {
    const input = [
      { i: 6, value: 3 },
      { i: 5, value: 2 },
      { i: 4, value: 1 },
      { i: 3, value: 3 },
      { i: 2, value: 2 },
      { i: 1, value: 1 },
    ];
    const results = minBy(input, (a) => a.value);
    expect(results).toEqual({ i: 4, value: 1 });
  });
});

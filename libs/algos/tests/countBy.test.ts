/* eslint-disable prefer-promise-reject-errors */
import { countBy } from '../src';

describe('countBy', () => {
  it('empty mapper', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = countBy(input);
    expect(results).toEqual({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
  });
  it('check values', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = countBy(input, (a) => a % 2);
    expect(results).toEqual({ 1: 3, 0: 2 });
  });
  it('check keys', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = countBy(input, (_, b) => b.length);
    expect(results).toEqual({ 3: 2, 4: 2, 5: 1 });
  });
});

/* eslint-disable prefer-promise-reject-errors */
import { every } from '../src';

describe('every', () => {
  it('check values false', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = every(input, (a) => a! > 3);
    expect(results).toEqual(false);
  });
  it('check values true', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = every(input, (a) => a! > 0);
    expect(results).toEqual(true);
  });
  it('check keys false', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = every(input, (_, b) => b!.length > 3);
    expect(results).toEqual(false);
  });
  it('check keys false', () => {
    const input = { one: 1, two: 2, three: 3, four: 4, five: 5 };
    const results = every(input, (_, b) => b!.length > 0);
    expect(results).toEqual(true);
  });
});

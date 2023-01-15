/* eslint-disable prefer-promise-reject-errors */
import { set } from '../src';

describe('set', () => {
  it('set flat', () => {
    const input = { one: 1, two: 2 };
    const results = set(input, 'three', 3);
    expect(results).toEqual({
      one: 1,
      two: 2,
      three: 3,
    });
  });
  it('set deep values', () => {
    const input = { one: 1, two: 2 };
    const results = set(input, 'three.four', 4);
    expect(results).toEqual({
      one: 1,
      two: 2,
      three: {
        four: 4,
      },
    });
  });
  it('set deep values with array', () => {
    const input = { one: 1, two: 2 };
    const results = set(input, ['three', 'four'], 4);
    expect(results).toEqual({
      one: 1,
      two: 2,
      three: {
        four: 4,
      },
    });
  });
});

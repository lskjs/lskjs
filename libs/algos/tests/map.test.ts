import { map } from '../src';

describe('map', () => {
  it('without mapper', () => {
    const input = { one: 1, two: 2, three: 3 };
    const results = map(input);
    expect(results).toEqual([1, 2, 3]);
  });
  it('simple mapper', () => {
    const input = { one: 1, two: 2, three: 3 };
    const mapper = (a: number): number => a * 2;
    // @ts-ignore
    const results = map(input, mapper);
    expect(results).toEqual([2, 4, 6]);
  });
});

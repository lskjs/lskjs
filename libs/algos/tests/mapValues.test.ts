import { mapValues } from '../src';

describe('mapValues', () => {
  it('without mapper', () => {
    const input = { one: 1, two: 2, three: 3 };
    const results = mapValues(input);
    expect(results).toEqual({ one: 1, two: 2, three: 3 });
  });
  it('simple mapper', () => {
    const input = { one: 1, two: 2, three: 3 };
    const mapper = (a: number): number => a * 2;
    // @ts-ignore
    const results = mapValues(input, mapper);
    expect(results).toEqual({ one: 2, two: 4, three: 6 });
  });
});

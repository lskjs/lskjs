/* eslint-disable prefer-promise-reject-errors */
import { setProps } from '../src';

describe('setProps', () => {
  it('setProps', () => {
    const input = { one: 1, two: 2 };
    const input2 = { two: 4, three: 6 };
    const input3 = { three: 9, four: 12 };
    const results = setProps({}, input, input2, input3);
    expect(results).toEqual({
      one: 1,
      two: 4,
      three: 9,
      four: 12
    });
  });
});

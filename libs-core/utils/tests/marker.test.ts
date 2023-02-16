/* global test expect */
import marker from '../src/marker';

// const test = (a, b) => b();
// const expect = a => ({ toBe: () => null });

test('marker 1', () => {
  const id = 1;
  const wrap = marker(id);
  // console.log(id, wrap(id));
  expect(
    wrap(id)
      .split('')
      .map((i) => i.charCodeAt(0)),
  ).toStrictEqual([27, 91, 51, 49, 109, 49, 27, 91, 51, 57, 109]);
});

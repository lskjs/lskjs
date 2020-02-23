/* global test expect */
import marker from '../src/marker';

// const test = (a, b) => b();
// const expect = a => ({ toBe: () => null });

test('marker 1', () => {
  const id = 1;
  const wrap = marker(id);
  console.log(id, wrap(id));
  expect(wrap(id)).toBe(1);
});

/* global test expect */
import prettyStringify from '../src/prettyStringify';

test('{}', () => {
  const obj = {};
  const res = prettyStringify(obj);
  expect(res).toBe(`{}`);
});
test('{a:1}', () => {
  const obj = { a: 1 };
  const res = prettyStringify(obj);
  expect(res).toBe(`{
  "a": 1
}`);
});
test('{a:1} 5', () => {
  const obj = { a: 'Hello world', b: 123 };
  const res = prettyStringify(obj, 10);
  expect(res).toBe(`{
  "a": "Hello ...,
  "b": 123
}`);
});

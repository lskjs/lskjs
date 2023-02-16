/* global test expect */
import cutText from '../src/cutText';

const text = '12345678901234567890';


test('cutText(12345678901234567890)', () => {
  expect(cutText(text)).toBe('12345678901234567890');
});

test('cutText(1234567890, 21)', () => {
  expect(cutText(text, 21)).toBe('12345678901234567890');
});

test('cutText(1234567890, 20)', () => {
  expect(cutText(text, 20)).toBe('12345678901234567890');
});

test('cutText(1234567890, 19)', () => {
  expect(cutText(text, 19)).toBe('1234567890123456...');
});

test('cutText(1234567890, 10)', () => {
  expect(cutText(text, 10)).toBe('1234567...');
});

test('cutText(1234567890, 10, 1)', () => {
  expect(cutText(text, 10, 1)).toBe('1234567...');
});

test('cutText(1234567890, 10, 4)', () => {
  expect(cutText(text, 10, 4)).toBe('1234567...');
});

test('cutText(1234567890, 10, 5)', () => {
  expect(cutText(text, 10, 5)).toBe('1234567...');
});

test('cutText(1234567890, 10, 6)', () => {
  expect(cutText(text, 10, 6)).toBe('...5678...');
});

test('cutText(1234567890, 10, 10)', () => {
  expect(cutText(text, 10, 10)).toBe('...9012...');
});

test('cutText(1234567890, 10, 15)', () => {
  expect(cutText(text, 10, 15)).toBe('...4567890');
});

/* global test expect */
import beauty from '../beauty';

test('check 0', () => {
  expect(beauty(0)).toBe('0');
});
test('check 0.0000000000001', () => {
  expect(beauty(0.0000000000001)).toBe('0');
});
test('check 0.00001', () => {
  expect(beauty(0.00001)).toBe('0');
});
test('check 0.0001', () => {
  expect(beauty(0.0001)).toBe('0');
});
test('check 0.001', () => {
  expect(beauty(0.001)).toBe('0');
});
test('check 0.1111', () => {
  expect(beauty(0.1111)).toBe('0.11');
});
test('check 1.0001', () => {
  expect(beauty(1.0001)).toBe('1');
});
test('check 1.001', () => {
  expect(beauty(1.001)).toBe('1');
});
test('check 1.01', () => {
  expect(beauty(1.01)).toBe('1.01');
});
test('check 1.1111', () => {
  expect(beauty(1.1111)).toBe('1.11');
});
test('check 1.11', () => {
  expect(beauty(1.11)).toBe('1.11');
});
test('check 9.001', () => {
  expect(beauty(9.001)).toBe('9');
});
test('check 9.889', () => {
  expect(beauty(9.889)).toBe('9.89');
});
test('check 9.999', () => {
  expect(beauty(9.999)).toBe('10');
});
test('check 5.555', () => {
  expect(beauty(5.555)).toBe('5.56');
});
test('check 11.01', () => {
  expect(beauty(11.01)).toBe('11');
});
test('check 11.1', () => {
  expect(beauty(11.1)).toBe('11.1');
});
test('check 11.11', () => {
  expect(beauty(11.11)).toBe('11.1');
});
test('check 100', () => {
  expect(beauty(100)).toBe('100');
});
test('check 100.1', () => {
  expect(beauty(100.1)).toBe('100');
});
test('check 1,110', () => {
  expect(beauty(1110)).toBe('1.11k');
});
test('check 10,100', () => {
  expect(beauty(10100)).toBe('10.1k');
});
test('check 101,010', () => {
  expect(beauty(101010)).toBe('101k');
});
test('check 1,010,101', () => {
  expect(beauty(1010101)).toBe('1.01m');
});
test('check 10,101,010', () => {
  expect(beauty(10101010)).toBe('10.1m');
});
test('check 100,101,010', () => {
  expect(beauty(100101010)).toBe('100m');
});
test('check 1,011,001,111', () => {
  expect(beauty(1011001111)).toBe('1.01bl');
});
test('check 10,010,010,101', () => {
  expect(beauty(10010010101)).toBe('10bl');
});
test('check 101,101,010,101', () => {
  expect(beauty(101101010101)).toBe('101bl');
});

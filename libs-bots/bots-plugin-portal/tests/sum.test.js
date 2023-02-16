/* global test expect */
import { sum } from '../src/sum';

test('sum 1+1=2', () => {
  expect(sum(1, 1)).toBe(2);
});

test('sum 2+2=4', () => {
  expect(sum(2, 2)).toBe(4);
});

test('sum 0+0=0', () => {
  expect(sum(0, 0)).toBe(0);
});

test('sum 2+(-2)=0', () => {
  expect(sum(2, -2)).toBe(0);
});

test('sum BigInt 123456765123123123 + 123456765123123123 = 246913530246246240', () => {
  expect(sum(123456765123123123, 123456765123123123)).toBe(246913530246246240);
});

test('sum null + null = 0', () => {
  expect(sum(null, null)).toBe(0);
});

test('sum 1 + NaN = NaN', () => {
  expect(sum(1, NaN)).toBe(NaN);
});

test('sum BigInt 123n + 123n = 246n', () => {
  expect(sum(123n, 123n)).toBe(246n);
});

// TODO:
// 0+0 = 0
// 2, -2 = 0

// 123456765123123123+123456765123123123 = 246913530246246240

// null + null = 0

// 1 + NaN = 0 ?

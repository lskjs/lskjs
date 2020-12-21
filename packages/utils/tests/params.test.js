/* global test expect */
import { toBoolean, toNumber, toInt } from '../src/params';

test('toBoolean("true") === true', () => {
  const obj = 'true';
  const res = true;

  expect(toBoolean(obj)).toStrictEqual(res);
});

test('toBoolean("1") === true', () => {
  const obj = '1';
  const res = true;

  expect(toBoolean(obj)).toStrictEqual(res);
});

test('toBoolean("asd") === true', () => {
  const obj = 'asd';
  const res = true;

  expect(toBoolean(obj)).toStrictEqual(res);
});

test('toBoolean("false") === false', () => {
  const obj = 'false';
  const res = false;

  expect(toBoolean(obj)).toStrictEqual(res);
});

test('toBoolean("0") === 0', () => {
  const obj = '0';
  const res = false;

  expect(toBoolean(obj)).toStrictEqual(res);
});

test('toNumber("123.23") === 123.23', () => {
  const obj = '123.23';
  const res = 123.23;

  expect(toNumber(obj)).toStrictEqual(res);
});

test('toInt("123.34") === 123', () => {
  const obj = '123.34';
  const res = 123;

  expect(toInt(obj)).toStrictEqual(res);
});

/* global test expect */
import { toBoolean, toNumber, toInt, params } from '../src/params';

test('toBoolean(true) === true', () => {
  const obj = true;
  const res = true;

  expect(toBoolean(obj)).toStrictEqual(res);
});

test('toBoolean(false) === false', () => {
  const obj = false;
  const res = false;

  expect(toBoolean(obj)).toStrictEqual(res);
});

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

test('toNumber(123.23) === 123.23', () => {
  const obj = 123.23;
  const res = 123.23;

  expect(toNumber(obj)).toStrictEqual(res);
});

test('toNumber(0) === 0', () => {
  const obj = 0;
  const res = 0;

  expect(toNumber(obj)).toStrictEqual(res);
});

test('toNumber("0") === 0', () => {
  const obj = '0';
  const res = 0;

  expect(toNumber(obj)).toStrictEqual(res);
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

test('params', () => {
  const data = {
    a: 'true',
    b: '123.45',
    c: '123.45',
    d: '2020-02-02',
    e: '',
    // f: 'true',
    j: '{"a": true, "b": 123.45}',
  };
  const schema = {
    a: 'boolean',
    b: 'number',
    c: 'int',
    d: 'date',
    e: {
      type: 'boolean',
      default: true,
    },
    f: {
      type: 'boolean',
      default: true,
    },
    j: 'json',
  };
  const res = {
    a: true,
    b: 123.45,
    c: 123,
    d: new Date('2020-02-02'),
    e: false,
    f: true,
    j: {
      a: true,
      b: 123.45,
    },
  };
  expect(params(data, schema)).toStrictEqual(res);
});

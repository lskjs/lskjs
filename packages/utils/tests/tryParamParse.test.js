/* global test expect */
import tryParamParse from '../src/tryParamParse';

test('tryParamParse(true) === true', () => {
  const obj = true;
  const res = true;

  expect(tryParamParse(obj)).toStrictEqual(res);
});

test('tryParamParse(false) === false', () => {
  const obj = false;
  const res = false;

  expect(tryParamParse(obj)).toStrictEqual(res);
});

test('tryParamParse("true") === true', () => {
  const obj = 'true';
  const res = true;

  expect(tryParamParse(obj)).toStrictEqual(res);
});

test('tryParamParse("false") === false', () => {
  const obj = 'false';
  const res = false;

  expect(tryParamParse(obj)).toStrictEqual(res);
});


//

test('tryParamParse(1) === 1', () => {
  const obj = 1;
  const res = 1;

  expect(tryParamParse(obj)).toStrictEqual(res);
});

test('tryParamParse(0) === 0', () => {
  const obj = 0;
  const res = 0;

  expect(tryParamParse(obj)).toStrictEqual(res);
});

test('tryParamParse("1") === 1', () => {
  const obj = '1';
  const res = 1;

  expect(tryParamParse(obj)).toStrictEqual(res);
});

test('tryParamParse("0") === 0', () => {
  const obj = '0';
  const res = 0;

  expect(tryParamParse(obj)).toStrictEqual(res);
});


//

test('tryParamParse(true, true) === true', () => {
  const obj = true;
  const res = true;
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

test('tryParamParse(false, true) === false', () => {
  const obj = false;
  const res = false;
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

test('tryParamParse("true", true) === true', () => {
  const obj = 'true';
  const res = true;
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

test('tryParamParse("false", true) === false', () => {
  const obj = 'false';
  const res = false;
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

test('tryParamParse("trueqwe", true) === true', () => {
  const obj = 'trueqwe';
  const res = 'trueqwe';
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

test('tryParamParse("", true) === true', () => {
  const obj = '';
  const res = true;
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

test('tryParamParse(null, true) === true', () => {
  const obj = null;
  const res = true;
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

test('tryParamParse(undefined, true) === true', () => {
  const obj = undefined;
  const res = true;
  const def = true;

  expect(tryParamParse(obj, def)).toStrictEqual(res);
});

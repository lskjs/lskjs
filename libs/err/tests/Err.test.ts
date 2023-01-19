/* global test expect */
import { pick } from '@lskjs/lodash';

import { Err } from '../src';

test('Err()', () => {
  const input = [];
  const res = {
    name: 'Err',
    code: 'err_unknown',
    message: 'err_unknown',
    stack: expect.stringMatching(/^Err: err_unknown/),
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err("some_code")', () => {
  const input = ['some_code'];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'some_code',
    stack: expect.stringMatching(/^Err: some_code/),
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err("some_code", "Some error message")', () => {
  const input = ['some_code', 'Some error message'];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'Some error message',
    stack: expect.stringMatching(/^Err: Some error message/),
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err("some_code", "Some error message", { options: 123 })', () => {
  const input = ['some_code', 'Some error message', { options: 123 }];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'Some error message',
    stack: expect.stringMatching(/^Err: Some error message/),
    options: 123,
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err("some_code", "Some error message", { options: 123 }, { otherOptions: 321 })', () => {
  const input = ['some_code', 'Some error message', { options: 123 }, { otherOptions: 321 }];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'Some error message',
    stack: expect.stringMatching(/^Err: Some error message/),
    options: 123,
    otherOptions: 321,
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err("some_code", { options: 123 })', () => {
  const input = ['some_code', { options: 123 }];
  const res = {
    name: 'Err',
    code: 'some_code',
    message: 'some_code',
    stack: expect.stringMatching(/^Err: some_code/),
    options: 123,
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err("some_code", { options: 123, code: "new_code" })', () => {
  const input = ['some_code', { options: 123, code: 'new_code' }];
  const res = {
    name: 'Err',
    code: 'new_code',
    message: 'new_code',
    stack: expect.stringMatching(/^Err: new_code/),
    options: 123,
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err({ options: 123 })', () => {
  const input = [{ options: 123 }];
  const res = {
    name: 'Err',
    code: 'err_unknown',
    message: 'err_unknown',
    stack: expect.stringMatching(/^Err: err_unknown/),
    options: 123,
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err({ options: 123 }, "Some broken message")', () => {
  const input = [{ options: 123 }];
  const res = {
    name: 'Err',
    code: 'err_unknown',
    message: 'err_unknown',
    stack: expect.stringMatching(/^Err: err_unknown/),
    options: 123,
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
});

test('Err("login_error", { realPassword: "password", data: { password: "incorrect" } })', () => {
  const input = [
    'login_error',
    'Password didnt match',
    { realPassword: 'password', data: { password: 'incorrect' } },
  ];
  const res = {
    name: 'Err',
    code: 'login_error',
    message: 'Password didnt match',
    realPassword: 'password',
    stack: expect.stringMatching(/^Err: Password didnt match/),
    data: {
      password: 'incorrect',
    },
  };
  const err = new Err(...input);
  expect(err instanceof Error).toBe(true);
  expect(err instanceof Err).toBe(true);
  expect(err.__err).toBe(true);
  expect(err).toMatchObject(res);
  expect(err.getJSON()).toStrictEqual(res);
  expect(JSON.stringify(err)).toStrictEqual(
    JSON.stringify(pick(res, ['name', 'code', 'message', 'test', 'data'])),
  );
});

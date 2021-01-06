/* global test expect */
import errProps from '../src/errProps';
import Err from '../src/Err';

test('errProps({ a: 123 })', () => {
  const input = { a: 123 };
  const res = { a: 123 };
  expect(errProps(input)).toStrictEqual(res);
});

test('errProps(new Error)', () => {
  const error = new Error('Test');
  const res = {
    message: 'Test',
    name: 'Error',
  };
  const err = errProps(error);
  expect(err).toMatchObject(res);
  expect(err.stack).toBeDefined();
});

test('errProps(new Error2)', () => {
  const error = new Error('Test');
  error.text = 'test_text';
  const res = {
    message: 'Test',
    name: 'Error',
    text: 'test_text',
  };
  const err = errProps(error);
  expect(err).toMatchObject(res);
  expect(err.stack).toBeDefined();
});

test('errProps(new Err)', () => {
  const error = new Err('test_code', { field: 123 });
  const res = {
    code: 'test_code',
    message: 'test_code',
    name: 'Err',
    field: 123,
  };
  const err = errProps(error);
  expect(err).toMatchObject(res);
  expect(err.stack).toBeDefined();
});

test('errProps()', () => {
  const input = undefined;
  const res = {};
  expect(errProps(input)).toStrictEqual(res);
});

test('errProps(123)', () => {
  const input = 123;
  const res = {};
  expect(errProps(input)).toStrictEqual(res);
});

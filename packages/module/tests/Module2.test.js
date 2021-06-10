/* global test expect */
import Module from '../src';

test('new Module()', () => {
  const instance = new Module();
  expect(instance).toMatchObject({
    __availableModules: {},
    __initedModules: {},
    __lifecycle: {},
    __config: undefined,
  });
});

test('instance.setProps()', async () => {
  const instance = new Module();
  instance.setProps({ a: 123 });
  expect(instance).toMatchObject({
    a: 123,
    __lifecycle: {},
  });
});

test('instance.init() throw MODULE_INVALID_LIVECYCLE_NEW without create', async () => {
  const instance = new Module();
  let err;
  try {
    await instance.init();
  } catch (error) {
    err = error;
  }
  expect(err.code).toBe('MODULE_INVALID_LIVECYCLE_NEW');
  expect(instance).toMatchObject({
    __lifecycle: {},
  });
});

test('Module.create()', async () => {
  const instance = await Module.create();
  expect(!!instance.__lifecycle.create).toBe(true);
  expect(!!instance.__lifecycle.initStart).toBe(true);
  expect(!!instance.__lifecycle.initFinish).toBe(true);
  expect(!!instance.__lifecycle.runStart).toBe(false);
  expect(!!instance.__lifecycle.runFinish).toBe(false);
  expect(!!instance.log).toBe(true);
  expect(instance).toMatchObject({
    name: 'Module',
  });
});

test('Module.start()', async () => {
  const instance = await Module.start();
  expect(!!instance.__lifecycle.create).toBe(true);
  expect(!!instance.__lifecycle.initStart).toBe(true);
  expect(!!instance.__lifecycle.initFinish).toBe(true);
  expect(!!instance.__lifecycle.runStart).toBe(true);
  expect(!!instance.__lifecycle.runFinish).toBe(true);
  expect(!!instance.log).toBe(true);
  expect(instance).toMatchObject({
    name: 'Module',
  });
});

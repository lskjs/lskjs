/* global test expect */
import Module from '../src/2';

test('new Module()', () => {
  const instance = new Module();
  expect(instance).toEqual({
    __initAt: undefined,
    __runAt: undefined,
    _module: undefined,
    app: undefined,
    config: undefined,
    debug: undefined,
    ee: undefined,
    log: undefined,
    name: undefined,
    parent: undefined,
  });
});

test('instance.init()', async () => {
  const instance = new Module();
  await instance.init();
  expect(!!instance.log).toBe(true);
  expect(!!instance.__initAt).toBe(true);
  expect(instance).toMatchObject({
    name: 'Module2',
    __runAt: undefined,
    _module: undefined,
    app: undefined,
    config: undefined,
    debug: undefined,
    ee: undefined,
    parent: undefined,
  });
});

test('instance.run()', async () => {
  const instance = new Module();
  await instance.run();
  expect(!!instance.log).toBe(true);
  expect(!!instance.__initAt).toBe(true);
  expect(!!instance.__runAt).toBe(true);
  expect(instance).toMatchObject({
    name: 'Module2',
    _module: undefined,
    app: undefined,
    config: undefined,
    debug: undefined,
    ee: undefined,
    parent: undefined,
  });
});

test('Module.create()', async () => {
  const instance = await Module.create();
  expect(!!instance.log).toBe(true);
  expect(!!instance.__initAt).toBe(true);
  expect(instance).toMatchObject({
    name: 'Module2',
    __runAt: undefined,
    _module: undefined,
    app: undefined,
    config: undefined,
    debug: undefined,
    ee: undefined,
    parent: undefined,
  });
});

test('Module.createAndRun()', async () => {
  const instance = await Module.createAndRun();
  expect(!!instance.log).toBe(true);
  expect(!!instance.__initAt).toBe(true);
  expect(!!instance.__runAt).toBe(true);
  expect(instance).toMatchObject({
    name: 'Module2',
    _module: undefined,
    app: undefined,
    config: undefined,
    debug: undefined,
    ee: undefined,
    parent: undefined,
  });
});

/* global test expect */
import ExampleModule from './ExampleModule';

test('new ExampleModule()', () => {
  const instance = new ExampleModule();
  expect(instance).toMatchObject({
    __availableModules: {},
    __initedModules: {},
    __lifecycle: {},
    // __config: undefined,
  });
});

test('ExampleModule.start()', async () => {
  const instance = await ExampleModule.start();
  expect(!!instance.__lifecycle.create).toBe(true);
  expect(!!instance.__lifecycle.initStart).toBe(true);
  expect(!!instance.__lifecycle.initFinish).toBe(true);
  expect(!!instance.__lifecycle.runStart).toBe(true);
  expect(!!instance.__lifecycle.runFinish).toBe(true);
  expect(!!instance.log).toBe(true);
  expect(instance).toMatchObject({
    name: 'ExampleModule',
  });
});

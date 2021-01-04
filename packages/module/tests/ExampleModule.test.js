/* global test expect */
import ExampleModule from './ExampleModule';

test('new ExampleModule()', () => {
  const instance = new ExampleModule();
  expect(instance).toEqual({
    __initAt: undefined,
    __runAt: undefined,
  });
});

test('ExampleModule.createAndRun()', async () => {
  const instance = await ExampleModule.createAndRun();
  expect(!!instance.log).toBe(true);
  expect(!!instance.__initAt).toBe(true);
  expect(instance).toMatchObject({
    name: 'ExampleModule',
  });
});

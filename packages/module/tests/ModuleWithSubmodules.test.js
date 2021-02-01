/* global test expect */

import { ItemsModule, ItemModule as BaseItemModel, Module } from '../src';

const store1 = { a: 1 };

const store2 = { b: 2 };

const stores = { store1, store2 };

// class ItemModule extends BaseItemModel {

// }

test('Deep injection ', async () => {
  const someModules = await Module.start({
    modules: {
      stores: [() => ItemsModule, { items: stores }],
    },
  });

  let s1 = await someModules.module('stores.store1');

  expect(s1).toMatchObject(store1);

  let s2 = await someModules.module('stores.store2');

  expect(s2).toMatchObject(store2);

  s1 = await someModules.module('stores.store1');

  expect(s1).toMatchObject(store1);

  s2 = await someModules.module('stores.store2');

  expect(s2).toMatchObject(store2);

  s1 = await someModules.module('stores.store1');

  expect(s1).toMatchObject(store1);

  s2 = await someModules.module('stores.store2');

  expect(s2).toMatchObject(store2);
});

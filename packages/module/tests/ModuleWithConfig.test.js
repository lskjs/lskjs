/* eslint-disable max-classes-per-file */
/* global test expect */
import merge from 'lodash/merge';
import Module from '../src/2';

test('Case #0 — empty config', async () => {
  class SomeModule extends Module {}
  const instance = await SomeModule.create();
  const res = {};
  expect(instance.config).toStrictEqual(res);
});

test('Case #1 — default config in class', async () => {
  class SomeModule extends Module {
    config = {
      a: 1,
    };
  }
  const instance = await SomeModule.create();
  const res = {
    a: 1,
  };
  expect(instance.config).toStrictEqual(res);
});

test('Case #2 — config while object creation', async () => {
  class SomeModule extends Module {}
  const instance = await SomeModule.create({
    config: {
      a: 11,
    },
  });
  const res = {
    a: 11,
  };
  expect(instance.config).toStrictEqual(res);
});

test('Case #3 — merging default and top config', async () => {
  class SomeModule extends Module {
    config = {
      a: 1,
      b: 2,
    };
  }
  const instance = await SomeModule.create({
    config: {
      a: 11,
      c: 33,
    },
  });
  const res = {
    a: 11,
    b: 2,
    c: 33,
  };
  expect(instance.config).toStrictEqual(res);
});

test('Case #4 — async config from db', async () => {
  class SomeModule extends Module {
    ok = false;
    fallWhileError = false;
    config = {
      a: 1,
      b: 2,
    };
    async getConfigFromDb() {
      if (!this.ok) throw 'not_ok';
      return {
        a: 111,
        fields: 333,
        from: 444,
        db: 555,
      };
    }
    async getConfig() {
      const localConfig = await super.getConfig();
      const dbConfig = await this.getConfigFromDb().catch((err) => {
        console.error('something wrong', err);
        if (this.fallWhileError) throw err;
        // throw err;
        return {};
      });
      return {
        ...localConfig,
        ...dbConfig,
      };
    }
  }
  const instanceOk = await SomeModule.create({
    ok: true,
    config: {
      a: 11,
      c: 33,
    },
  });
  const instanceNotOk = await SomeModule.create({
    ok: false,
    config: {
      a: 11,
      c: 33,
    },
  });

  let err;
  await SomeModule.create({
    ok: false,
    fallWhileError: true,
    config: {
      a: 11,
      c: 33,
    },
  }).catch((error) => {
    err = error;
  });

  // if all ok
  const resOk = {
    a: 111,
    b: 2,
    c: 33,
    fields: 333,
    from: 444,
    db: 555,
  };

  // if error
  const resNotOk = {
    a: 11,
    b: 2,
    c: 33,
  };

  expect(instanceOk.config).toStrictEqual(resOk);
  expect(instanceNotOk.config).toStrictEqual(resNotOk);
  expect(err).toStrictEqual('not_ok');
});

test('Case #5 — deep config merging', async () => {
  class SomeModule extends Module {
    config = {
      a: 1,
      b: 2,
      deep: {
        c: 3,
        d: 4,
        deepest: {
          e: 5,
          d: 6,
        },
      },
    };

    async getConfig() {
      // blind merge
      return merge(this.defaultConfig, this.config, this.__config);
      // or controlable merge
      // eslint-disable-next-line no-unreachable
      return {
        ...this.config,
        ...this.__config,
        deep: {
          ...this.config.deep,
          ...this.__config.deep,
          deepest: {
            ...this.config.deep.deepest,
            ...this.__config.deep.deepest,
          },
        },
      };
    }
  }

  const instance = await SomeModule.create({
    config: {
      aa: 11,
      b: 22,
      cc: 33,
      deep: {
        cc: 33,
        deepest: {
          d: 66,
          ff: 77,
        },
      },
    },
  });

  const res = {
    a: 1,
    b: 22,
    deep: {
      c: 3,
      d: 4,
      deepest: {
        e: 5,
        d: 66,
        ff: 77,
      },
      cc: 33,
    },
    aa: 11,
    cc: 33,
  };
  expect(instance.config).toStrictEqual(res);
});

/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
/* global test expect */
import { Err } from '@lskjs/err';

import Module from '../src/Module';

process.env.LOG_FORMAT = 'none';

const delay = (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration));
const withDelay = async (duration, fn) => {
  await delay(duration);
  return fn();
};

// https://stackoverflow.com/questions/45692456/whats-the-difference-between-tomatchobject-and-objectcontaining

export class NoErrorModule extends Module {
  async init() {
    super.init();
    await delay(300);
  }
}

export class InitErrorModule extends Module {
  async init() {
    super.init();
    await delay(300);
    throw 'INIT_ERR';
  }
}

export class RunErrorModule extends Module {
  async run() {
    super.run();
    await delay(300);
    throw 'RUN_ERR';
  }
}

test('parallel-init noErrorModule', async () => {
  const app = await Module.start({
    modules: {
      noErrorModule: NoErrorModule,
      initErrorModule: InitErrorModule,
      runErrorModule: RunErrorModule,
    },
  });

  const noErrorModule = await app.module('noErrorModule');

  expect(noErrorModule.name).toEqual('NoErrorModule');
});

test('parallel-init initErrorModule catch', async () => {
  const app = await Module.start({
    modules: {
      noErrorModule: NoErrorModule,
      initErrorModule: InitErrorModule,
      runErrorModule: RunErrorModule,
    },
  });

  // expect(app.module('initErrorModule')).resolves.toThrow('MODULE_INJECT_ERROR');
  const err = new Err('MODULE_INJECT_ERROR', {
    data: {
      name: 'Module',
      module: 'initErrorModule',
      code: 'err_unknown',
      message: 'INIT_ERR',
    },
    err: 'INIT_ERR',
  });
  const errInfo = Err.getJSON(err);
  delete errInfo.stack;
  await expect(app.module('initErrorModule')).rejects.toMatchObject(errInfo);
});

test('parallel-init runErrorModule catch', async () => {
  const app = await Module.start({
    modules: {
      noErrorModule: NoErrorModule,
      initErrorModule: InitErrorModule,
      runErrorModule: RunErrorModule,
    },
  });

  // const err = new Err('MODULE_INJECT_ERROR', { data: { name: 'runErrorModule' } });
  const err = new Err('MODULE_INJECT_ERROR', {
    data: {
      name: 'Module',
      module: 'runErrorModule',
      code: 'err_unknown',
      message: 'RUN_ERR',
    },
    err: 'RUN_ERR',
  });
  const errInfo = Err.getJSON(err);
  delete errInfo.stack;
  await expect(app.module('runErrorModule')).rejects.toMatchObject(errInfo);
});

test('parallel-init initErrorModule twice catch', async () => {
  const app = await Module.start({
    debug: 1,
    modules: {
      noErrorModule: NoErrorModule,
      initErrorModule: InitErrorModule,
      runErrorModule: RunErrorModule,
    },
  });

  const module = 'runErrorModule';
  const err = new Err('MODULE_INJECT_ERROR', {
    data: {
      name: 'Module',
      module,
      code: 'err_unknown',
      message: 'RUN_ERR',
    },
    err: 'RUN_ERR',
  });
  const errInfo = Err.getJSON(err);
  delete errInfo.stack;
  await Promise.all([
    expect(withDelay(0, () => app.module(module))).rejects.toMatchObject(errInfo),
    expect(withDelay(100, () => app.module(module))).rejects.toMatchObject(errInfo),
    expect(withDelay(200, () => app.module(module))).rejects.toMatchObject(errInfo),
    expect(withDelay(300, () => app.module(module))).rejects.toMatchObject(errInfo),
    expect(withDelay(400, () => app.module(module))).rejects.toMatchObject(errInfo),
    expect(withDelay(500, () => app.module(module))).rejects.toMatchObject(errInfo),
  ]);
});

test('parallel-init initErrorModule twice catch', async () => {
  const app = await Module.start({
    debug: 1,
    modules: {
      middle: class Middle extends Module {
        getModules() {
          return {
            noErrorModule: NoErrorModule,
            initErrorModule: InitErrorModule,
            runErrorModule: RunErrorModule,
          };
        }
      },
    },
  });
  const module = 'runErrorModule';
  const err = new Err('MODULE_INJECT_ERROR', {
    data: {
      module,
      name: 'Middle',
      code: 'err_unknown',
      message: 'RUN_ERR',

      // name: 'Module',
      // code: 'MODULE_INJECT_ERROR',
      // message: 'MODULE_INJECT_ERROR',
    },
    err: 'RUN_ERR',
  });
  const errInfo = Err.getJSON(err);
  delete errInfo.stack;

  const err2 = await app.module(`middle.${module}`).catch((e) => e);
  // console.log({ err2 });

  await Promise.all([
    expect(withDelay(0, () => app.module(`middle.${module}`))).rejects.toMatchObject(errInfo),
    expect(withDelay(100, () => app.module(`middle.${module}`))).rejects.toMatchObject(errInfo),
    expect(withDelay(200, () => app.module(`middle.${module}`))).rejects.toMatchObject(errInfo),
    expect(withDelay(300, () => app.module(`middle.${module}`))).rejects.toMatchObject(errInfo),
    expect(withDelay(400, () => app.module(`middle.${module}`))).rejects.toMatchObject(errInfo),
    expect(withDelay(500, () => app.module(`middle.${module}`))).rejects.toMatchObject(errInfo),
  ]);
});

// test('parallel-init runErrorModule twice catch', async () => {
//   const app = await Module.start({
//     modules: {
//       noErrorModule: NoErrorModule,
//       initErrorModule: InitErrorModule,
//       runErrorModule: RunErrorModule,
//     },
//   });

//   // expect(app.module('runErrorModule')).resolves.toThrow('MODULE_INJECT_ERROR');
//   const err = new Err('MODULE_INJECT_ERROR', { data: { name: 'runErrorModule2' } });
//   const errInfo = Err.getJSON(err);
//   delete errInfo.stack;
//   const err2 = await app.module('runErrorModule').catch((e) => e);
//   console.log({err2})

//   await Promise.all([
//     expect(app.module('runErrorModule')).rejects.toMatchObject(err),
//     expect(app.module('runErrorModule').catch((e) => Err.getJSON(e))).resolves.toMatchObject(errInfo),
//     expect(app.module('runErrorModule')).rejects.toMatchObject(err),
//     expect(app.module('runErrorModule').catch((e) => Err.getJSON(e))).resolves.toMatchObject(errInfo),
//   ]);
//   await delay(1000);

//   await expect(app.module('runErrorModule')).rejects.toMatchObject(err);
//   await expect(app.module('runErrorModule').catch((e) => Err.getJSON(e))).resolves.toMatchObject(errInfo);
// });

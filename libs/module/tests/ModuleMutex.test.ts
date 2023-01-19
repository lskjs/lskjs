/* eslint-disable no-console */
/* global test expect */
import Module from '../src';

const delay = (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration));

let start = 0;
let progress = 0;
let finish = 0;

class InnerModule extends Module {
  async init() {
    // console.log('InnerModule.init');
    start += 1;
    await super.init();
    progress += 1;
    await delay(2000);
    finish += 1;
  }
  async run() {
    // console.log('InnerModule.run');
    await super.run();
  }
}

test('mutex x5 ', async () => {
  const main = await Module.start({
    modules: {
      inner: InnerModule,
    },
  });

  // console.log('start', {
  //   start,
  //   progress,
  //   finish,
  // });

  expect(start).toEqual(0);
  expect(progress).toEqual(0);
  expect(finish).toEqual(0);

  const promises = [...new Array(5)].map(() => main.module('inner'));

  // console.log('progress 1', {
  //   start,
  //   progress,
  //   finish,
  // });
  await delay(1000);

  expect(start).toEqual(1);
  expect(progress).toEqual(1);
  expect(finish).toEqual(0);

  // console.log('progress 2', {
  //   start,
  //   progress,
  //   finish,
  // });
  await delay(2000);

  // console.log('progress 3', {
  //   start,
  //   progress,
  //   finish,
  // });

  expect(start).toEqual(1);
  expect(progress).toEqual(1);
  expect(finish).toEqual(1);

  await Promise.all(promises);

  // console.log('finish', {
  //   start,
  //   progress,
  //   finish,
  // });
  expect(start).toEqual(1);
  expect(progress).toEqual(1);
  expect(finish).toEqual(1);
});

/* global test expect */
import { Err } from '@lskjs/err';
import { delay } from '@lskjs/utils/delay';

import { promiseWithTimeout } from '../src/utils/promiseWithTimeout';

test('promiseWithTimeout(123)', async () => {
  const res = promiseWithTimeout(123);
  expect(res).resolves.toBe(123);
});
test('promiseWithTimeout(fn(123))', async () => {
  const res = promiseWithTimeout(() => 123);
  expect(res).resolves.toBe(123);
});
test('promiseWithTimeout(async fn(123))', async () => {
  const res = promiseWithTimeout(async () => 123);
  expect(res).resolves.toBe(123);
});
test('promiseWithTimeout(promise(123))', async () => {
  const res = promiseWithTimeout((async () => 123)());
  expect(res).resolves.toBe(123);
});
test('promiseWithTimeout(async fn(300), 500)', async () => {
  const res = promiseWithTimeout(async () => {
    await delay(300);
    return 300;
  }, 500);
  expect(res).resolves.toBe(300);
});
test('ERR promiseWithTimeout(async fn(300), 200)', async () => {
  const res = promiseWithTimeout(async () => {
    await delay(300);
    return 300;
  }, 200);
  //   console.log({ res: await res().catch((err) => err) });
  expect(res).rejects.toMatch(new Err('PROMISE_TIMEOUT', { timeout: 200 }));
});
// test('promiseWithTimeout(async fn(123), 5000)', async () => {
//   const res = await promiseWithTimeout(async () => 123);
//   expect(res).toBe(123);
// });
// test('promiseWithTimeout(async fn(6000), 1000)', async () => {
//   const res = await promiseWithTimeout(async () => {
//     await delay(1500);
//     return 1000;
//   }, 1000);
//   expect(res).toBe(1000);
// });

// test('promiseWithTimeout(123)', async () => {
//   const res = await promiseWithTimeout(() => 123);

//   expect(res).toBe(123);
// });

/* global test expect */
import Err from '@lskjs/err';

import { PermitServerModule } from '../src/PermitServerModule';

// const test = (a, b) => b();
// const expect = a => ({ toBe: () => null });

test('generateCode()', async () => {
  const permitModule = await PermitServerModule.start();

  const res = permitModule.generateCode();
  // expect(res).toStrictEqual(10); // TODO: isHex alphabet
  expect(res.length).toStrictEqual(10);
});
test('generateCode(5)', async () => {
  const permitModule = await PermitServerModule.start();

  const res = permitModule.generateCode({ length: 5 });
  // expect(res).toStrictEqual(10); // TODO: isHex alphabet
  expect(res.length).toStrictEqual(5);
});
test('generateCode(hex)', async () => {
  const permitModule = await PermitServerModule.start();

  const res = permitModule.generateCode({ type: 'hex' });
  // expect(res).toStrictEqual(10); // TODO: isHex alphabet
  expect(res.length).toStrictEqual(10);
});
test('generateCode(url)', async () => {
  const permitModule = await PermitServerModule.start();

  const res = permitModule.generateCode({ type: 'url' });
  // expect(res).toStrictEqual(10); // TODO: isNumber alphabet
  expect(res.length).toStrictEqual(10);
});

test('generateCode(number)', async () => {
  const permitModule = await PermitServerModule.start();

  const res = permitModule.generateCode({ type: 'number' });
  // expect(res).toStrictEqual(10); // TODO: isNumber alphabet
  expect(res.length).toStrictEqual(10);
});
test('generateCode(some)', async () => {
  const permitModule = await PermitServerModule.start();
  expect(() => permitModule.generateCode({ type: 'some' })).toThrow(Err);
  expect(() => permitModule.generateCode({ type: 'some' })).toThrow('NOT_IMPLEMENTED');
});

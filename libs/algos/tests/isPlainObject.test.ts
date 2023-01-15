/* eslint-disable @typescript-eslint/no-empty-function */
import { isPlainObject } from '../src';

describe('isPlainObject', () => {
  it('should return `true` if the object is created by the `Object` constructor.', () => {
    expect(isPlainObject(Object.create({}))).toEqual(true);
    expect(isPlainObject(Object.create(Object.prototype))).toEqual(true);
    expect(isPlainObject({ foo: 'bar' })).toEqual(true);
    expect(isPlainObject({})).toEqual(true);
    expect(isPlainObject(Object.create(null))).toEqual(true);
  });

  it('should return `false` if the object is not created by the `Object` constructor.', () => {
    function Foo() {
      // @ts-ignore
      this.abc = {};
    }
    expect(isPlainObject(/foo/)).toEqual(false);
    expect(isPlainObject(() => {})).toEqual(false);
    // eslint-disable-next-line prefer-arrow-callback
    expect(isPlainObject(function () {})).toEqual(false);
    expect(isPlainObject(1)).toEqual(false);
    expect(isPlainObject(['foo', 'bar'])).toEqual(false);
    expect(isPlainObject([])).toEqual(false);
    // @ts-ignore
    expect(isPlainObject(new Foo())).toEqual(false);
    expect(isPlainObject(null)).toEqual(false);
  });
});

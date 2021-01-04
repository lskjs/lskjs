/* global test expect describe */
/* eslint-disable max-classes-per-file */

class Base {
  name = 'UNKNOWN';
  constructor(props = {}) {
    Object.assign(this, props);
    this.init();
  }
  init() {
    this.name = this.constructor.name;
  }
}

class A extends Base {
  title = 'Default Title A';
}

class AA extends A {}

class B extends Base {
  title = 'Default Title B';
  constructor(props = {}) {
    super(props);
    Object.assign(this, props);
  }
}

const emptya = new A();
const emptyb = new B();
const emptyaa = new AA();

const a = new A({ title: 'Title A' });
const b = new B({ title: 'Title B' });
const aa = new AA({ title: 'Title AA' });

describe('es6-extends-problem', () => {
  test('emptya.name === "A"', () => {
    expect(emptya.name).toEqual('A');
  });

  test('emptya.title === "Default Title A"', () => {
    expect(emptya.title).toEqual('Default Title A');
  });

  test('emptyb.name === "B"', () => {
    expect(emptyb.name).toEqual('B');
  });

  test('emptyb.title === "Default Title B"', () => {
    expect(emptyb.title).toEqual('Default Title B');
  });

  test('emptyaa.name === "AA"', () => {
    expect(emptyaa.name).toEqual('AA');
  });

  test('emptyaa.title === "Default Title A"', () => {
    expect(emptyaa.title).toEqual('Default Title A');
  });

  test('a.name === "A"', () => {
    expect(a.name).toEqual('A');
  });

  test('a.title === "Title A"', () => {
    // expect(a.title).toEqual('Title A');
    expect(a.title).toEqual('Default Title A'); // TODO: implict behaviour
  });

  test('b.name === "B"', () => {
    expect(b.name).toEqual('B');
  });

  test('b.title === "Title B"', () => {
    expect(b.title).toEqual('Title B');
  });

  test('aa.name === "AA"', () => {
    expect(aa.name).toEqual('AA');
  });

  test('aa.title === "Title AA"', () => {
    // expect(aa.title).toEqual('Title AA');
    expect(aa.title).toEqual('Default Title A'); // TODO: implict behaviour
  });
});

/* global test expect describe beforeAll  */
/* eslint-disable max-classes-per-file */
import Base from '../../src';

class A extends Base {
  title = 'Default Title A';
}

class AA extends A {}

class B extends Base {
  title = 'Default Title B';
}

describe('Module extend problem', () => {
  let emptya;
  let emptyb;
  let emptyaa;

  let a;
  let b;
  let aa;
  beforeAll(async () => {
    emptya = await A.create();
    emptyb = await B.create();
    emptyaa = await AA.create();

    a = await A.create({ title: 'Title A' });
    b = await B.create({ title: 'Title B' });
    aa = await AA.create({ title: 'Title AA' });
  });

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
    expect(a.title).toEqual('Title A');
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
    expect(aa.title).toEqual('Title AA');
  });
});

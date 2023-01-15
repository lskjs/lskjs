/* eslint-disable prefer-promise-reject-errors */
import { pad } from '../src';

describe('pad', () => {
  it('empty width', () => {
    const input = 'Hello';
    const results = pad(input);
    expect(results).toEqual('Hello');
  });
  it('width=1', () => {
    const input = 'Hello';
    const results = pad(input, 1);
    expect(results).toEqual('Hello');
  });
  it('width=5', () => {
    const input = 'Hello';
    const results = pad(input, 5);
    expect(results).toEqual('Hello');
  });
  it('width=6', () => {
    const input = 'Hello';
    const results = pad(input, 6);
    expect(results).toEqual('Hello ');
  });
  it('width=7', () => {
    const input = 'Hello';
    const results = pad(input, 7);
    expect(results).toEqual(' Hello ');
  });
  it('width=7 fillString=#', () => {
    const input = 'Hello';
    const results = pad(input, 7, '#');
    expect(results).toEqual('#Hello#');
  });
});

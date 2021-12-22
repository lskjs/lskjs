/* global test expect describe */

import { isProxyHub } from '../src/utils/parseProxyParam';

const tests = [
  [
    '(1) http://proxy.lskjs.ru/proxy.txt',
    {
      proxy: 'http://proxy.lskjs.ru/proxy.txt',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(2) https://proxy.lskjs.ru/some.txt',
    {
      proxy: 'https://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(3) http://proxy.lskjs.ru/some.txt',
    {
      proxy: 'http://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(4) http://proxy.lskjs.ru/some.json',
    {
      proxy: 'http://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(5) http://proxy.lskjs.ru/proxies',
    {
      proxy: 'http://proxy.lskjs.ru/proxies',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(6) http://lskjs:pass@proxy.lskjs.ru/proxtList',
    {
      proxy: 'http://lskjs:pass@proxy.lskjs.ru/proxtList',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(7) proxy.lskjs.ru/some.json',
    {
      proxy: 'proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(8) ftp://proxy.lskjs.ru/some.json',
    {
      proxy: 'ftp://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    '(9) lskjs:pass@lskjs.ru:1234',
    {
      proxy: 'lskjs:pass@lskjs.ru:1234',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    '(10) lskjs:pass@lskjs.ru?provider=123',
    {
      proxy: 'lskjs:pass@lskjs.ru?provider=123',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    '(11) lskjs.ru:1234',
    {
      proxy: 'lskjs.ru:1234',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    '(12) lskjs:pass@lskjs.ru',
    {
      proxy: 'lskjs:pass@lskjs.ru',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
];

describe('isProxyHub', () => {
  test.each(tests)(
    '[isProxyHub]: %s',
    async (name, { proxy, callback }) => {
      const response = isProxyHub(proxy);
      callback(response);
    },
    10000,
  );
});

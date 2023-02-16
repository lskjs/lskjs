/* global test expect describe */

import { isProxyTxt } from '../src/utils/parseProxyParam';

const tests = [
  [
    'Proxy txt 1 - host, port, username, password',
    {
      proxy: 'lsk.js.io:1111:lskjs:sdjfb2634',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Proxy txt 2 - host, port, username',
    {
      proxy: 'lsk.js.io:1111:lskjs',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Proxy txt 3 - host, port',
    {
      proxy: 'lsk.js.io:1111',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Proxy txt 4 - host',
    {
      proxy: 'lsk.js.io',
      callback: (response) => {
        expect(response).toBe(true);
      },
    },
  ],
  [
    'Proxy txt 5 - not txt',
    {
      proxy: 'http://proxy.lskjs.ru/proxy.txt',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 6 - not txt',
    {
      proxy: 'http://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 7 - not txt',
    {
      proxy: 'https://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 8 - not txt',
    {
      proxy: 'ftp://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 9 - not txt',
    {
      proxy: 'proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 10 - not txt',
    {
      proxy: './lskjs/proxy.txt',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 11 - not txt',
    {
      proxy: '/lskjs/proxy.txt',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 12 - not txt',
    {
      proxy: 'lskjs-uk:sjhdfhjs123@lsk.proxy.io:7000?provider=lskProvider',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
  [
    'Proxy txt 13 - not txt',
    {
      proxy: 'lsk-uk:asjfh123;;;;@proxy.lsk.com:9000?provider=lskProvider',
      callback: (response) => {
        expect(response).toBe(false);
      },
    },
  ],
];

describe('isProxyTxt', () => {
  test.each(tests)(
    '[isProxyTxt]: %s',
    async (name, { proxy, callback }) => {
      const response = isProxyTxt(proxy);
      callback(response);
    },
    10000,
  );
});

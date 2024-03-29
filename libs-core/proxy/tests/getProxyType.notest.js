/* global test expect describe */

import { getProxyType } from '../src/utils/parseProxyParam';

const tests = [
  [
    'Proxy is null',
    {
      proxy: null,
      callback: (response) => {
        expect(response).toBe(null);
      },
    },
  ],
  [
    'Proxy is undefined',
    {
      callback: (response) => {
        expect(response).toBe(null);
      },
    },
  ],
  [
    'Proxy list 1',
    {
      proxy: 'http://proxy.lskjs.ru/proxy.txt',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy list 2',
    {
      proxy: 'https://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy list 3',
    {
      proxy: 'http://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy list 4',
    {
      proxy: 'http://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy list 5',
    {
      proxy: 'http://proxy.lskjs.ru/proxies',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy list 6',
    {
      proxy: 'http://lskjs:pass@proxy.lskjs.ru/proxtList',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy list 7',
    {
      proxy: 'proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy list 8',
    {
      proxy: 'ftp://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe('list');
      },
    },
  ],
  [
    'Proxy file 1',
    {
      proxy: '/home/lskjs/proxy.txt',
      callback: (response) => {
        expect(response).toBe('file');
      },
    },
  ],
  [
    'Proxy file 2',
    {
      proxy: './lskjs/proxy.txt',
      callback: (response) => {
        expect(response).toBe('file');
      },
    },
  ],
  [
    'Proxy random chars 1',
    {
      proxy: 'jdgfhsgdfhgvsdhg',
      callback: (response) => {
        expect(response).toBe(null);
      },
    },
  ],
  [
    'Proxy random chars 2',
    {
      proxy: 'google.com',
      callback: (response) => {
        expect(response).toBe(null);
      },
    },
  ],
  [
    'Proxy random chars 3',
    {
      proxy: 'blablabla-test/',
      callback: (response) => {
        expect(response).toBe(null);
      },
    },
  ],
  [
    'Proxy txt 1',
    {
      proxy: 'lsk.js.io:1111:lskjs:sdjfb2634',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy txt 2',
    {
      proxy: 'lsk.js.io:1111:lskjs:sdjfb2634?provider=lsk',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy txt 3',
    {
      proxy: 'lsk.js.io:1111:lskjs',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy txt 4',
    {
      proxy: 'lsk.js.io:1111:lskjs?provider=lsk',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy txt 5',
    {
      proxy: 'lsk.js.io:1111',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy txt 6',
    {
      proxy: 'lsk.js.io:1111?provider=lsk',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy txt 7',
    {
      proxy: 'lsk.js.io',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy txt 8',
    {
      proxy: 'lsk.js.io?provider=lsk',
      callback: (response) => {
        expect(response).toBe('txt');
      },
    },
  ],
  [
    'Proxy 1',
    {
      proxy: 'lskjs-uk:sjhdfhjs123@lsk.proxy.io:7000?provider=lskProvider',
      callback: (response) => {
        expect(response).toBe('proxy');
      },
    },
  ],
  [
    'Proxy 2',
    {
      proxy: 'lsk-uk:asjfh123;;;;@proxy.lsk.com:9000?provider=lskProvider',
      callback: (response) => {
        expect(response).toBe('proxy');
      },
    },
  ],
];

describe('getProxyType', () => {
  test.each(tests)(
    '[getProxyType]: %s',
    async (name, { proxy, callback }) => {
      const response = getProxyType(proxy);
      callback(response);
    },
    10000,
  );
});
